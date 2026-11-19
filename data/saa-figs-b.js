// SAA の図解（担当 b）。仕様は /home/claude/site/FIG_SCHEMA.md
window.FIGS = window.FIGS || {};
window.FIGS.saa = window.FIGS.saa || [];
(function () {
  // 図ごとに一意な id を持つ矢じり（青・緑・赤・灰）
  const defs = (id) => `<defs>
    <marker id="${id}-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="${id}-aok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahok"/></marker>
    <marker id="${id}-ang" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahng"/></marker>
    <marker id="${id}-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ah"/></marker>
  </defs>`;

  window.FIGS.saa.push(
  // 1. ELB + Auto Scaling
  {
    id: "elb-asg",
    lessons: [6],
    notes: ["EC2 Auto Scaling"],
    title: "ALBが振り分け、Auto Scalingが台数を増やして入れ替える",
    svg: `<svg viewBox="0 0 460 530" xmlns="http://www.w3.org/2000/svg">
  ${defs("elb-asg")}
  <rect x="170" y="10" width="120" height="40" rx="20" class="f-box2"/>
  <text x="230" y="35" text-anchor="middle" class="f-tb">利用者</text>

  <g data-s="1">
    <path d="M230,50 L230,78" class="f-flow" marker-end="url(#elb-asg-am)"/>
    <text x="240" y="69" class="f-ts">リクエスト</text>
    <rect x="160" y="80" width="140" height="40" rx="6" class="f-zone2"/>
    <text x="230" y="105" text-anchor="middle" class="f-tm">ALB</text>
  </g>

  <g data-s="2">
    <rect x="10" y="146" width="440" height="320" rx="10" class="f-zone2"/>
    <rect x="22" y="158" width="200" height="194" rx="8" class="f-zone"/>
    <text x="34" y="176" class="f-ts">AZ-a</text>
    <rect x="238" y="158" width="200" height="194" rx="8" class="f-zone"/>
    <text x="250" y="176" class="f-ts">AZ-c</text>
    <rect x="47" y="190" width="150" height="40" rx="6" class="f-box"/>
    <text x="122" y="215" text-anchor="middle" class="f-t">EC2</text>
    <rect x="263" y="190" width="150" height="40" rx="6" class="f-box"/>
    <text x="338" y="215" text-anchor="middle" class="f-t">EC2</text>
    <path d="M160,100 C122,100 122,140 122,188" class="f-flow" marker-end="url(#elb-asg-am)"/>
    <path d="M300,100 C338,100 338,140 338,188" class="f-flow" marker-end="url(#elb-asg-am)"/>
    <text x="230" y="138" text-anchor="middle" class="f-ts">振り分け</text>
    <text x="230" y="452" text-anchor="middle" class="f-tb">Auto Scaling グループ</text>
  </g>

  <g data-s="3">
    <rect x="47" y="244" width="150" height="40" rx="6" class="f-box"/>
    <text x="122" y="269" text-anchor="middle" class="f-t">EC2（追加）</text>
    <rect x="263" y="244" width="150" height="40" rx="6" class="f-box"/>
    <text x="338" y="269" text-anchor="middle" class="f-t">EC2（追加）</text>
    <text x="230" y="380" text-anchor="middle" class="f-tm">負荷↑ → 台数を増やす（スケールアウト）</text>
  </g>

  <g data-s="4">
    <rect x="263" y="190" width="150" height="40" rx="6" class="f-ngz"/>
    <text x="338" y="215" text-anchor="middle" class="f-tng">✕ 異常</text>
    <rect x="263" y="298" width="150" height="40" rx="6" class="f-box"/>
    <text x="338" y="323" text-anchor="middle" class="f-t">EC2（代わり）</text>
    <text x="230" y="406" text-anchor="middle" class="f-tok">異常な台は外して、自動で入れ替え</text>
  </g>

  <g data-s="5">
    <rect x="60" y="482" width="340" height="38" rx="6" class="f-box"/>
    <text x="230" y="506" text-anchor="middle" class="f-tb">最小 2 台 〜 最大 6 台の間で維持</text>
  </g>
</svg>`,
    steps: [
      { text: "利用者のリクエストは、まず **ALB（ロードバランサー）** に届く。サーバーに直接は行かない。" },
      { text: "ALB の後ろに **Auto Scaling グループ** を置き、EC2 を **2つの AZ** に分けて並べる。ALB がリクエストを各 EC2 に振り分ける。" },
      { text: "アクセスが増えて負荷が上がると、Auto Scaling が EC2 を自動で追加する（**スケールアウト**）。減ったら台数を減らす（スケールイン）。" },
      { text: "**ヘルスチェック**で調子の悪い台を見つけると、ALB はそこへ振り分けるのをやめ、Auto Scaling が新しい台を作って入れ替える（自己修復）。ELB ヘルスチェックを有効にすると、アプリの異常も検知できる。" },
      { text: "Auto Scaling グループには最小・希望・最大の台数を決めておく。**つまり「ALB で振り分け＋複数 AZ の Auto Scaling」で、負荷にも故障にも自動で対応する**のが基本形。" }
    ]
  },

  // 2. ELB の種類
  {
    id: "elb-types",
    lessons: [],
    notes: ["Elastic Load Balancing（ALB / NLB / GWLB）"],
    title: "ALBは中身で、NLBは速さで、GWLBは検査役を挟む",
    svg: `<svg viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg">
  ${defs("elb-types")}
  <g data-s="1">
    <rect x="10" y="10" width="440" height="170" rx="10" class="f-zone"/>
    <text x="24" y="36" class="f-tb">ALB：L7（HTTP の中身を見る）</text>
    <rect x="24" y="56" width="100" height="96" rx="6" class="f-zone2"/>
    <text x="74" y="109" text-anchor="middle" class="f-tm">ALB</text>
    <rect x="268" y="56" width="168" height="40" rx="6" class="f-box"/>
    <text x="352" y="81" text-anchor="middle" class="f-t">API サーバー</text>
    <rect x="268" y="112" width="168" height="40" rx="6" class="f-box"/>
    <text x="352" y="137" text-anchor="middle" class="f-t">画像サーバー</text>
    <path d="M124,76 L266,76" class="f-flow" marker-end="url(#elb-types-am)"/>
    <text x="195" y="68" text-anchor="middle" class="f-tm">/api/*</text>
    <path d="M124,132 L266,132" class="f-flow" marker-end="url(#elb-types-am)"/>
    <text x="195" y="124" text-anchor="middle" class="f-tm">/img/*</text>
    <text x="24" y="172" class="f-ts">パス・ホスト名で振り分け／WAF と連携できる</text>
  </g>

  <g data-s="2">
    <rect x="10" y="196" width="440" height="170" rx="10" class="f-zone"/>
    <text x="24" y="222" class="f-tb">NLB：L4（TCP/UDP の接続を流す）</text>
    <rect x="24" y="242" width="100" height="96" rx="6" class="f-zone2"/>
    <text x="74" y="284" text-anchor="middle" class="f-tm">NLB</text>
    <text x="74" y="304" text-anchor="middle" class="f-ts">固定 IP</text>
    <rect x="268" y="270" width="168" height="40" rx="6" class="f-box"/>
    <text x="352" y="295" text-anchor="middle" class="f-t">EC2 など</text>
    <path d="M124,290 L266,290" class="f-flow" marker-end="url(#elb-types-am)"/>
    <text x="195" y="282" text-anchor="middle" class="f-tm">TCP/UDP</text>
    <text x="24" y="358" class="f-ts">AZ ごとに固定 IP・超低遅延・大量の接続</text>
  </g>

  <g data-s="3">
    <rect x="10" y="382" width="440" height="170" rx="10" class="f-zone"/>
    <text x="24" y="408" class="f-tb">GWLB：検査役（FW）を挟む</text>
    <rect x="24" y="428" width="100" height="96" rx="6" class="f-zone2"/>
    <text x="74" y="481" text-anchor="middle" class="f-tm">GWLB</text>
    <rect x="268" y="428" width="168" height="96" rx="6" class="f-box"/>
    <text x="352" y="472" text-anchor="middle" class="f-t">ファイアウォール</text>
    <text x="352" y="494" text-anchor="middle" class="f-ts">IDS/IPS など</text>
    <path d="M124,452 L266,452" class="f-flow" marker-end="url(#elb-types-am)"/>
    <text x="195" y="444" text-anchor="middle" class="f-ts">検査へ</text>
    <path d="M266,500 L126,500" class="f-ok" marker-end="url(#elb-types-aok)"/>
    <text x="195" y="492" text-anchor="middle" class="f-ts">OK なら戻す</text>
    <text x="24" y="544" class="f-ts">GENEVE（6081番）で通信に透過的に挟む</text>
  </g>

  <g data-s="4">
    <rect x="10" y="566" width="440" height="44" rx="6" class="f-box"/>
    <text x="230" y="594" text-anchor="middle" class="f-tb">パス→ALB ／ 固定IP→NLB ／ FW→GWLB</text>
  </g>
</svg>`,
    steps: [
      { text: "**ALB** は HTTP/HTTPS（L7）のロードバランサー。URL の中身まで読めるので、**/api はAPIサーバーへ、/img は画像サーバーへ**のようにパスやホスト名で振り分けられる。WAF とも連携できる。" },
      { text: "**NLB** は TCP/UDP（L4）のロードバランサー。中身は見ずに接続を流すので**超低遅延・大量接続**に強い。**AZ ごとに固定 IP**（Elastic IP も可）を持てるのが ALB との大きな違い。" },
      { text: "**GWLB** は、ファイアウォールや IDS/IPS などのアプライアンスを通信の途中に**挟んで**、検査役の台数をまとめてスケールさせるためのもの。GENEVE（ポート 6081）を使う。" },
      { text: "**つまり、URL のパスで分けたい → ALB、固定 IP や超低遅延 → NLB、セキュリティ製品を挟みたい → GWLB**。Classic Load Balancer は旧世代なので新規設計の正解にはしない。" }
    ]
  },

  // 3. 疎結合
  {
    id: "decoupling",
    lessons: [9],
    notes: ["疎結合（SQS / SNS / EventBridge / Step Functions）"],
    title: "SQSを挟むと、受け手が止まっても仕事を取りこぼさない",
    svg: `<svg viewBox="0 0 460 560" xmlns="http://www.w3.org/2000/svg">
  ${defs("decoupling")}
  <g data-s="1">
    <rect x="10" y="10" width="440" height="146" rx="10" class="f-ngz"/>
    <text x="24" y="36" class="f-tb">密結合：直接呼ぶ</text>
    <rect x="30" y="56" width="110" height="44" rx="6" class="f-box"/>
    <text x="85" y="83" text-anchor="middle" class="f-t">送り手</text>
    <rect x="320" y="56" width="110" height="44" rx="6" class="f-box"/>
    <text x="375" y="83" text-anchor="middle" class="f-t">受け手</text>
    <path d="M140,78 L318,78" class="f-ng" marker-end="url(#decoupling-ang)"/>
    <text x="230" y="70" text-anchor="middle" class="f-ts">直接呼ぶ</text>
    <text x="375" y="126" text-anchor="middle" class="f-tng">✕ 落ちている</text>
    <text x="85" y="126" text-anchor="middle" class="f-tng">✕ 失敗する</text>
  </g>

  <g data-s="2">
    <rect x="10" y="172" width="440" height="130" rx="10" class="f-pub"/>
    <text x="24" y="198" class="f-tb">疎結合：SQS を挟む</text>
    <rect x="20" y="216" width="90" height="44" rx="6" class="f-box"/>
    <text x="65" y="243" text-anchor="middle" class="f-t">送り手</text>
    <rect x="165" y="210" width="130" height="56" rx="6" class="f-zone2"/>
    <text x="230" y="232" text-anchor="middle" class="f-tm">SQS キュー</text>
    <circle cx="205" cy="252" r="5" class="f-dot"/>
    <circle cx="230" cy="252" r="5" class="f-dot"/>
    <circle cx="255" cy="252" r="5" class="f-dot"/>
    <rect x="350" y="216" width="90" height="44" rx="6" class="f-box"/>
    <text x="395" y="243" text-anchor="middle" class="f-t">受け手</text>
    <path d="M110,238 L163,238" class="f-flow" marker-end="url(#decoupling-am)"/>
    <text x="137" y="230" text-anchor="middle" class="f-ts">送る</text>
    <path d="M295,238 L348,238" class="f-flow" marker-end="url(#decoupling-am)"/>
    <text x="322" y="230" text-anchor="middle" class="f-ts">取り出す</text>
    <text x="65" y="288" text-anchor="middle" class="f-tok">すぐ成功</text>
    <text x="395" y="288" text-anchor="middle" class="f-tok">後で処理</text>
  </g>

  <g data-s="3">
    <rect x="10" y="318" width="440" height="124" rx="10" class="f-box2"/>
    <text x="24" y="342" class="f-tb">可視性タイムアウト</text>
    <rect x="24" y="362" width="120" height="40" rx="6" class="f-zone2"/>
    <text x="84" y="387" text-anchor="middle" class="f-tm">メッセージ</text>
    <rect x="300" y="354" width="136" height="34" rx="6" class="f-box"/>
    <text x="368" y="376" text-anchor="middle" class="f-t">受け手 1</text>
    <rect x="300" y="398" width="136" height="34" rx="6" class="f-box"/>
    <text x="368" y="420" text-anchor="middle" class="f-t">受け手 2</text>
    <path d="M144,376 L298,371" class="f-ok" marker-end="url(#decoupling-aok)"/>
    <text x="221" y="364" text-anchor="middle" class="f-ts">受信して処理中</text>
    <path d="M144,390 L298,414" class="f-ng" marker-end="url(#decoupling-ang)"/>
    <text x="200" y="434" text-anchor="middle" class="f-tng">その間は見えない</text>
  </g>

  <g data-s="4">
    <rect x="10" y="458" width="440" height="92" rx="10" class="f-box2"/>
    <text x="24" y="482" class="f-tb">デッドレターキュー（DLQ）</text>
    <rect x="24" y="496" width="120" height="40" rx="6" class="f-box"/>
    <text x="84" y="521" text-anchor="middle" class="f-t">SQS キュー</text>
    <rect x="300" y="496" width="136" height="40" rx="6" class="f-priv"/>
    <text x="368" y="521" text-anchor="middle" class="f-tb">DLQ（隔離）</text>
    <path d="M144,516 L298,516" class="f-ng" marker-end="url(#decoupling-ang)"/>
    <text x="221" y="508" text-anchor="middle" class="f-ts">N回失敗で移す</text>
  </g>
</svg>`,
    steps: [
      { text: "**密結合**：送り手が受け手を直接呼ぶと、受け手が落ちている・混んでいるだけで、送り手の処理まで**失敗**してしまう。" },
      { text: "間に **SQS キュー**を挟む（**疎結合**）。送り手はキューに入れた時点で成功。受け手は自分のペースで取り出すので、遅れても止まっても、メッセージは溜まって**後で処理**される。注文の急増もバッファできる。" },
      { text: "受け手 1 が受信したメッセージは、**可視性タイムアウト**の間ほかの受け手から見えなくなる。処理時間より短いと二重処理になるので、**処理時間より長く**設定する。" },
      { text: "何度やっても処理に失敗するメッセージは、maxReceiveCount 回を超えたら **DLQ（デッドレターキュー）** に移して隔離する。**つまり「急増しても取りこぼさない」「片方の障害を広げない」→ SQS で疎結合**。" }
    ]
  },

  // 4. SNS ファンアウト
  {
    id: "sns-fanout",
    lessons: [],
    notes: ["疎結合（SQS / SNS / EventBridge / Step Functions）"],
    title: "SNSから複数のSQSへ配ると、1回の通知で並行処理できる",
    svg: `<svg viewBox="0 0 460 390" xmlns="http://www.w3.org/2000/svg">
  ${defs("sns-fanout")}
  <rect x="150" y="10" width="160" height="40" rx="6" class="f-box"/>
  <text x="230" y="35" text-anchor="middle" class="f-tb">注文アプリ</text>

  <g data-s="1">
    <path d="M230,50 L230,84" class="f-flow" marker-end="url(#sns-fanout-am)"/>
    <text x="240" y="72" class="f-ts">1回だけ発行</text>
    <rect x="150" y="86" width="160" height="46" rx="6" class="f-zone2"/>
    <text x="230" y="114" text-anchor="middle" class="f-tm">SNS トピック</text>
  </g>

  <g data-s="2">
    <path d="M190,132 L95,182" class="f-flow" marker-end="url(#sns-fanout-am)"/>
    <path d="M230,132 L230,182" class="f-flow" marker-end="url(#sns-fanout-am)"/>
    <path d="M270,132 L365,182" class="f-flow" marker-end="url(#sns-fanout-am)"/>
    <text x="320" y="112" class="f-tm">全員にコピー</text>
    <rect x="20" y="184" width="130" height="44" rx="6" class="f-box2"/>
    <text x="85" y="211" text-anchor="middle" class="f-t">SQS（在庫）</text>
    <rect x="165" y="184" width="130" height="44" rx="6" class="f-box2"/>
    <text x="230" y="211" text-anchor="middle" class="f-t">SQS（メール）</text>
    <rect x="310" y="184" width="130" height="44" rx="6" class="f-box2"/>
    <text x="375" y="211" text-anchor="middle" class="f-t">SQS（分析）</text>
  </g>

  <g data-s="3">
    <path d="M85,228 L85,274" class="f-flow" marker-end="url(#sns-fanout-am)"/>
    <path d="M230,228 L230,274" class="f-flow" marker-end="url(#sns-fanout-am)"/>
    <path d="M375,228 L375,274" class="f-flow" marker-end="url(#sns-fanout-am)"/>
    <text x="93" y="256" class="f-ts">取り出す</text>
    <text x="238" y="256" class="f-ts">取り出す</text>
    <text x="383" y="256" class="f-ts">取り出す</text>
    <rect x="20" y="276" width="130" height="44" rx="6" class="f-box"/>
    <text x="85" y="303" text-anchor="middle" class="f-t">在庫を減らす</text>
    <rect x="165" y="276" width="130" height="44" rx="6" class="f-box"/>
    <text x="230" y="303" text-anchor="middle" class="f-t">メールを送る</text>
    <rect x="310" y="276" width="130" height="44" rx="6" class="f-box"/>
    <text x="375" y="303" text-anchor="middle" class="f-t">分析に記録</text>
  </g>

  <g data-s="4">
    <rect x="165" y="276" width="130" height="44" rx="6" class="f-ngz"/>
    <text x="230" y="303" text-anchor="middle" class="f-tng">✕ 停止中</text>
    <text x="230" y="346" text-anchor="middle" class="f-ts">メールの分はキューに溜まって待つ</text>
    <text x="230" y="372" text-anchor="middle" class="f-tok">在庫・分析は止まらない</text>
  </g>
</svg>`,
    steps: [
      { text: "注文アプリは「注文が入った」というお知らせを **SNS トピック**に **1回だけ**発行する。送り先がいくつあるかは気にしない。" },
      { text: "SNS は、トピックを購読している **複数の SQS キュー**それぞれに、同じメッセージをコピーして届ける（プッシュ）。これが**ファンアウト**。" },
      { text: "各キューの後ろの処理（在庫・メール・分析）が、それぞれ自分のキューから取り出して**並行**に動く。" },
      { text: "メール処理が止まっても、その分はキューに溜まって待つだけで、在庫と分析は止まらない。**つまり「1つの出来事を複数の処理に同時に流したい」→ SNS ＋ 複数 SQS のファンアウト**。" }
    ]
  },

  // 5. コンピューティングの選択
  {
    id: "compute-choice",
    lessons: [],
    notes: ["コンピューティングの選択（Lambda / API Gateway / ECS / EKS / Fargate）"],
    title: "自分で管理する範囲が狭いほど、運用は楽になる",
    svg: `<svg viewBox="0 0 460 540" xmlns="http://www.w3.org/2000/svg">
  ${defs("compute-choice")}
  <rect x="140" y="10" width="14" height="14" rx="3" class="f-priv"/>
  <text x="160" y="22" class="f-ts">自分で管理</text>
  <rect x="260" y="10" width="14" height="14" rx="3" class="f-pub"/>
  <text x="280" y="22" class="f-ts">AWS が管理</text>

  <g data-s="1">
    <rect x="10" y="48" width="120" height="48" rx="6" class="f-box"/>
    <text x="70" y="70" text-anchor="middle" class="f-tb">EC2</text>
    <text x="70" y="88" text-anchor="middle" class="f-ts">仮想サーバー</text>
    <rect x="140" y="48" width="230" height="32" class="f-priv"/>
    <text x="255" y="69" text-anchor="middle" class="f-ts">自分で管理</text>
    <rect x="370" y="48" width="80" height="32" class="f-pub"/>
    <text x="410" y="69" text-anchor="middle" class="f-ts">AWS</text>
    <text x="140" y="98" class="f-ts">自分：OS・パッチ・台数・アプリ</text>
  </g>

  <g data-s="2">
    <rect x="10" y="152" width="120" height="48" rx="6" class="f-box"/>
    <text x="70" y="174" text-anchor="middle" class="f-tb">ECS on EC2</text>
    <text x="70" y="192" text-anchor="middle" class="f-ts">コンテナ＋EC2</text>
    <rect x="140" y="152" width="190" height="32" class="f-priv"/>
    <text x="235" y="173" text-anchor="middle" class="f-ts">自分で管理</text>
    <rect x="330" y="152" width="120" height="32" class="f-pub"/>
    <text x="390" y="173" text-anchor="middle" class="f-ts">AWS</text>
    <text x="140" y="202" class="f-ts">自分：EC2 の台数とパッチ・コンテナ</text>
  </g>

  <g data-s="3">
    <rect x="10" y="256" width="120" height="48" rx="6" class="f-box"/>
    <text x="70" y="278" text-anchor="middle" class="f-tb">Fargate</text>
    <text x="70" y="296" text-anchor="middle" class="f-ts">サーバー管理不要</text>
    <rect x="140" y="256" width="120" height="32" class="f-priv"/>
    <text x="200" y="277" text-anchor="middle" class="f-ts">自分で管理</text>
    <rect x="260" y="256" width="190" height="32" class="f-pub"/>
    <text x="355" y="277" text-anchor="middle" class="f-ts">AWS</text>
    <text x="140" y="306" class="f-ts">自分：コンテナ（中身とコード）だけ</text>
  </g>

  <g data-s="4">
    <rect x="10" y="360" width="120" height="48" rx="6" class="f-zone2"/>
    <text x="70" y="382" text-anchor="middle" class="f-tm">Lambda</text>
    <text x="70" y="400" text-anchor="middle" class="f-ts">関数を置くだけ</text>
    <rect x="140" y="360" width="60" height="32" class="f-priv"/>
    <text x="170" y="381" text-anchor="middle" class="f-ts">自分</text>
    <rect x="200" y="360" width="250" height="32" class="f-pub"/>
    <text x="325" y="381" text-anchor="middle" class="f-ts">AWS</text>
    <text x="140" y="410" class="f-ts">自分：コード（関数）だけ</text>
  </g>

  <g data-s="5">
    <rect x="10" y="438" width="440" height="92" rx="6" class="f-box"/>
    <text x="230" y="466" text-anchor="middle" class="f-tb">運用負荷を最小に → サーバーレス</text>
    <text x="230" y="490" text-anchor="middle" class="f-ts">Lambda は 1回の実行が最大 15 分まで</text>
    <text x="230" y="512" text-anchor="middle" class="f-ts">15 分超・常時稼働 → ECS on Fargate や EC2</text>
  </g>
</svg>`,
    steps: [
      { text: "**EC2** は仮想サーバーを丸ごと借りる。OS の更新（パッチ）、台数、ミドルウェア、アプリまで**ほぼ全部自分で管理**する。自由度は一番高い。" },
      { text: "**ECS on EC2** はコンテナをまとめて動かす仕組み。コンテナの配置は ECS がやるが、下で動く **EC2 の台数やパッチは自分の担当**のまま。" },
      { text: "**Fargate** にすると、コンテナを動かす **サーバー（EC2）の管理が不要**になる。自分はコンテナの中身だけ用意すればよい。「コンテナを運用負荷最小で」→ ECS on Fargate。" },
      { text: "**Lambda** はサーバーレス関数。**コードを置くだけ**で、何か起きたとき（S3 にファイル、SQS にメッセージなど）に動く。動いた分だけ課金され、待機中は無料。" },
      { text: "**つまり「運用負荷を最小に」ならサーバーレス（Lambda・Fargate）**。ただし Lambda は **最大 15 分**なので、それより長い処理や常時動く処理は ECS/Fargate や EC2 を選ぶ。" }
    ]
  },

  // 6. RDS マルチAZ vs リードレプリカ
  {
    id: "rds-multiaz-replica",
    lessons: [8, 11],
    notes: ["RDS（マルチAZ vs リードレプリカ、RDS Proxy）"],
    title: "マルチAZは止まらないため、リードレプリカは読みを速くするため",
    svg: `<svg viewBox="0 0 460 560" xmlns="http://www.w3.org/2000/svg">
  ${defs("rds-multiaz-replica")}
  <g data-s="1">
    <rect x="10" y="10" width="440" height="222" rx="10" class="f-zone"/>
    <text x="24" y="34" class="f-tb">マルチAZ（可用性）</text>
    <rect x="170" y="44" width="120" height="36" rx="6" class="f-box"/>
    <text x="230" y="67" text-anchor="middle" class="f-t">アプリ</text>
    <rect x="16" y="96" width="180" height="126" rx="8" class="f-zone"/>
    <text x="28" y="214" class="f-ts">AZ-a</text>
    <rect x="264" y="96" width="180" height="126" rx="8" class="f-zone"/>
    <text x="276" y="214" class="f-ts">AZ-c</text>
    <rect x="36" y="138" width="140" height="44" rx="6" class="f-box"/>
    <text x="106" y="165" text-anchor="middle" class="f-tb">プライマリ</text>
    <rect x="284" y="138" width="140" height="44" rx="6" class="f-box2"/>
    <text x="354" y="165" text-anchor="middle" class="f-t">スタンバイ</text>
    <path d="M170,62 C106,62 106,100 106,136" class="f-flow" marker-end="url(#rds-multiaz-replica-am)"/>
    <text x="96" y="90" text-anchor="end" class="f-ts">読み書き</text>
    <path d="M176,160 L282,160" class="f-flow" marker-end="url(#rds-multiaz-replica-am)"/>
    <text x="230" y="152" text-anchor="middle" class="f-ts">同期コピー</text>
    <text x="354" y="202" text-anchor="middle" class="f-tng">普段は読めない</text>
  </g>

  <g data-s="2">
    <rect x="36" y="138" width="140" height="44" rx="6" class="f-ngz"/>
    <text x="106" y="165" text-anchor="middle" class="f-tng">✕ 障害</text>
    <path d="M290,62 C354,62 354,100 354,136" class="f-ok" marker-end="url(#rds-multiaz-replica-aok)"/>
    <text x="362" y="86" class="f-tok">自動切替</text>
  </g>

  <g data-s="3">
    <rect x="10" y="248" width="440" height="226" rx="10" class="f-zone"/>
    <text x="24" y="272" class="f-tb">リードレプリカ（読み取り性能）</text>
    <rect x="170" y="286" width="120" height="36" rx="6" class="f-box"/>
    <text x="230" y="309" text-anchor="middle" class="f-t">アプリ</text>
    <rect x="24" y="356" width="140" height="44" rx="6" class="f-box"/>
    <text x="94" y="383" text-anchor="middle" class="f-tb">プライマリ</text>
    <rect x="296" y="344" width="130" height="40" rx="6" class="f-box"/>
    <text x="361" y="369" text-anchor="middle" class="f-t">リードレプリカ</text>
    <rect x="296" y="400" width="130" height="40" rx="6" class="f-box"/>
    <text x="361" y="425" text-anchor="middle" class="f-t">リードレプリカ</text>
    <path d="M170,304 C94,304 94,330 94,354" class="f-flow" marker-end="url(#rds-multiaz-replica-am)"/>
    <text x="84" y="332" text-anchor="end" class="f-ts">書き込み</text>
    <path d="M164,374 L294,364" class="f-flow" marker-end="url(#rds-multiaz-replica-am)"/>
    <path d="M164,384 L294,420" class="f-flow" marker-end="url(#rds-multiaz-replica-am)"/>
    <text x="229" y="356" text-anchor="middle" class="f-ts">非同期コピー</text>
  </g>

  <g data-s="4">
    <path d="M290,300 C400,300 400,320 400,342" class="f-ok" marker-end="url(#rds-multiaz-replica-aok)"/>
    <path d="M290,314 C440,314 444,330 444,360 L444,400 C444,416 440,420 428,420" class="f-ok" marker-end="url(#rds-multiaz-replica-aok)"/>
    <text x="300" y="292" class="f-tok">読み取りを分散</text>
    <text x="361" y="462" text-anchor="middle" class="f-ts">別リージョンも可・昇格できる</text>
  </g>

  <g data-s="5">
    <rect x="10" y="488" width="440" height="62" rx="6" class="f-box"/>
    <text x="230" y="513" text-anchor="middle" class="f-tb">止まらない → マルチAZ（同期・自動切替）</text>
    <text x="230" y="537" text-anchor="middle" class="f-tb">読みを速く → リードレプリカ（非同期）</text>
  </g>
</svg>`,
    steps: [
      { text: "**マルチAZ**：別の AZ に**スタンバイ**を置き、プライマリへの書き込みを**同期**でコピーし続ける。スタンバイは待機専用で、**普段は読み取りにも使えない**。" },
      { text: "プライマリ側の AZ で障害が起きると、スタンバイへ**自動でフェイルオーバー**する。接続先の DNS 名（エンドポイント）は同じなので、アプリはそのまま。目的は**可用性**。" },
      { text: "**リードレプリカ**：プライマリのデータを**非同期**でコピーした読み取り専用の DB。書き込みは今までどおりプライマリだけが受ける。" },
      { text: "アプリは重い検索などの**読み取りをレプリカに分散**させ、プライマリの負担を減らす。レプリカは別リージョンにも作れ、**昇格（プロモート）**して単独の DB にもできる（自動ではなく手動）。" },
      { text: "**つまり「障害時に自動で切り替えたい」→ マルチAZ、「読み取りが多くて遅い」→ リードレプリカ**。同期か非同期か、読めるか読めないかの違いが試験で狙われる。" }
    ]
  },

  // 7. Aurora
  {
    id: "aurora",
    lessons: [],
    notes: ["Amazon Aurora（Global Database / Serverless）"],
    title: "Auroraは計算と保存を分け、保存は3AZに6つ持つ",
    svg: `<svg viewBox="0 0 460 520" xmlns="http://www.w3.org/2000/svg">
  ${defs("aurora")}
  <g data-s="1">
    <rect x="10" y="10" width="440" height="330" rx="10" class="f-zone"/>
    <text x="24" y="34" class="f-tb">プライマリリージョン</text>
    <rect x="22" y="46" width="130" height="264" rx="8" class="f-zone"/>
    <text x="32" y="62" class="f-ts">AZ-a</text>
    <rect x="165" y="46" width="130" height="264" rx="8" class="f-zone"/>
    <text x="175" y="62" class="f-ts">AZ-b</text>
    <rect x="308" y="46" width="130" height="264" rx="8" class="f-zone"/>
    <text x="318" y="62" class="f-ts">AZ-c</text>
    <rect x="32" y="72" width="110" height="40" rx="6" class="f-zone2"/>
    <text x="87" y="97" text-anchor="middle" class="f-tm">ライター</text>
    <rect x="175" y="72" width="110" height="40" rx="6" class="f-box"/>
    <text x="230" y="97" text-anchor="middle" class="f-t">リーダー</text>
    <rect x="318" y="72" width="110" height="40" rx="6" class="f-box"/>
    <text x="373" y="97" text-anchor="middle" class="f-t">リーダー</text>
  </g>

  <g data-s="2">
    <path d="M87,112 L87,168" class="f-flow" marker-end="url(#aurora-am)"/>
    <text x="95" y="146" class="f-ts">書く</text>
    <path d="M230,112 L230,168" class="f-flow" marker-end="url(#aurora-am)"/>
    <text x="238" y="146" class="f-ts">読む</text>
    <path d="M373,112 L373,168" class="f-flow" marker-end="url(#aurora-am)"/>
    <text x="381" y="146" class="f-ts">読む</text>
    <rect x="16" y="170" width="428" height="112" rx="8" class="f-box2"/>
    <text x="230" y="194" text-anchor="middle" class="f-tb">共有ストレージ（クラスターボリューム）</text>
    <rect x="40" y="212" width="44" height="30" rx="4" class="f-box"/>
    <text x="62" y="231" text-anchor="middle" class="f-ts">コピー</text>
    <rect x="92" y="212" width="44" height="30" rx="4" class="f-box"/>
    <text x="114" y="231" text-anchor="middle" class="f-ts">コピー</text>
    <rect x="183" y="212" width="44" height="30" rx="4" class="f-box"/>
    <text x="205" y="231" text-anchor="middle" class="f-ts">コピー</text>
    <rect x="235" y="212" width="44" height="30" rx="4" class="f-box"/>
    <text x="257" y="231" text-anchor="middle" class="f-ts">コピー</text>
    <rect x="326" y="212" width="44" height="30" rx="4" class="f-box"/>
    <text x="348" y="231" text-anchor="middle" class="f-ts">コピー</text>
    <rect x="378" y="212" width="44" height="30" rx="4" class="f-box"/>
    <text x="400" y="231" text-anchor="middle" class="f-ts">コピー</text>
    <text x="230" y="268" text-anchor="middle" class="f-ts">3 つの AZ に 合計 6 つのコピー</text>
  </g>

  <g data-s="3">
    <rect x="32" y="72" width="110" height="40" rx="6" class="f-ngz"/>
    <text x="87" y="97" text-anchor="middle" class="f-tng">✕ 障害</text>
    <text x="230" y="330" text-anchor="middle" class="f-tok">ライター障害 → リーダーが昇格</text>
  </g>

  <g data-s="4">
    <rect x="10" y="380" width="440" height="128" rx="10" class="f-zone"/>
    <text x="24" y="404" class="f-tb">セカンダリリージョン（読み取り専用）</text>
    <rect x="24" y="424" width="140" height="44" rx="6" class="f-box"/>
    <text x="94" y="451" text-anchor="middle" class="f-t">リーダー</text>
    <rect x="236" y="424" width="200" height="44" rx="6" class="f-box2"/>
    <text x="336" y="451" text-anchor="middle" class="f-t">ストレージの複製</text>
    <path d="M236,446 L166,446" class="f-flow" marker-end="url(#aurora-am)"/>
    <text x="200" y="438" text-anchor="middle" class="f-ts">読む</text>
    <path d="M400,282 L400,422" class="f-flow" marker-end="url(#aurora-am)"/>
    <text x="392" y="358" text-anchor="end" class="f-tm">Global Database</text>
    <text x="392" y="374" text-anchor="end" class="f-ts">遅延 1 秒未満</text>
    <text x="230" y="494" text-anchor="middle" class="f-ts">障害時はこちらを昇格（RPO 約 1 秒）</text>
  </g>
</svg>`,
    steps: [
      { text: "Aurora は、計算をする **DB インスタンス**（書き込み役の**ライター** 1 台と、読み取り役の**リーダー**＝Aurora レプリカ、最大 15 個）を複数の AZ に置ける。" },
      { text: "データは各インスタンスの中ではなく、**共有ストレージ（クラスターボリューム）**にある。ストレージは **3 つの AZ に 6 つのコピー**を自動で持つので、ライターもリーダーも同じデータを見る。容量も自動で増える。" },
      { text: "ライターが壊れると、**リーダーの 1 台がライターに昇格**して動き続ける。データは共有ストレージにあるので、コピーし直す必要がない。" },
      { text: "**Aurora Global Database** にすると、ストレージごと**別リージョンへ複製**する（遅延は通常 1 秒未満）。セカンダリは読み取り専用で、リージョン障害時は昇格させる。**つまり「RPO 約 1 秒・RTO 短めのクロスリージョン DR」→ Aurora Global Database**。" }
    ]
  },

  // 8. DR 戦略
  {
    id: "dr-strategies",
    lessons: [11],
    notes: ["災害対策（DR）戦略とRTO/RPO"],
    title: "DR側で動かす量が多いほど、早く戻せるが高くつく",
    svg: `<svg viewBox="0 0 460 470" xmlns="http://www.w3.org/2000/svg">
  ${defs("dr-strategies")}
  <text x="302" y="16" text-anchor="middle" class="f-tm">DR リージョンの状態</text>
  <text x="205" y="38" text-anchor="middle" class="f-ts">データ</text>
  <text x="302" y="38" text-anchor="middle" class="f-ts">アプリ</text>
  <text x="399" y="38" text-anchor="middle" class="f-ts">本番並みの規模</text>

  <g data-s="1">
    <rect x="10" y="48" width="140" height="70" rx="6" class="f-box"/>
    <text x="80" y="70" text-anchor="middle" class="f-tb">バックアップ</text>
    <text x="80" y="88" text-anchor="middle" class="f-tb">＆リストア</text>
    <text x="80" y="108" text-anchor="middle" class="f-ts">時間単位・最安</text>
    <rect x="160" y="58" width="90" height="50" rx="6" class="f-box2"/>
    <text x="205" y="88" text-anchor="middle" class="f-ts">バックアップ</text>
    <rect x="257" y="58" width="90" height="50" rx="6" class="f-zone"/>
    <text x="302" y="88" text-anchor="middle" class="f-ts">なし</text>
    <rect x="354" y="58" width="90" height="50" rx="6" class="f-zone"/>
    <text x="399" y="88" text-anchor="middle" class="f-ts">なし</text>
  </g>

  <g data-s="2">
    <rect x="10" y="134" width="140" height="70" rx="6" class="f-box"/>
    <text x="80" y="164" text-anchor="middle" class="f-tb">パイロットライト</text>
    <text x="80" y="194" text-anchor="middle" class="f-ts">数十分・低</text>
    <rect x="160" y="144" width="90" height="50" rx="6" class="f-pub"/>
    <text x="205" y="174" text-anchor="middle" class="f-ts">複製・稼働</text>
    <rect x="257" y="144" width="90" height="50" rx="6" class="f-zone"/>
    <text x="302" y="174" text-anchor="middle" class="f-ts">停止中</text>
    <rect x="354" y="144" width="90" height="50" rx="6" class="f-zone"/>
    <text x="399" y="174" text-anchor="middle" class="f-ts">なし</text>
  </g>

  <g data-s="3">
    <rect x="10" y="220" width="140" height="70" rx="6" class="f-box"/>
    <text x="80" y="250" text-anchor="middle" class="f-tb">ウォームスタンバイ</text>
    <text x="80" y="280" text-anchor="middle" class="f-ts">分単位・中〜高</text>
    <rect x="160" y="230" width="90" height="50" rx="6" class="f-pub"/>
    <text x="205" y="260" text-anchor="middle" class="f-ts">複製・稼働</text>
    <rect x="257" y="230" width="90" height="50" rx="6" class="f-pub"/>
    <text x="302" y="260" text-anchor="middle" class="f-ts">縮小で稼働</text>
    <rect x="354" y="230" width="90" height="50" rx="6" class="f-zone"/>
    <text x="399" y="260" text-anchor="middle" class="f-ts">障害時に拡張</text>
  </g>

  <g data-s="4">
    <rect x="10" y="306" width="140" height="70" rx="6" class="f-zone2"/>
    <text x="80" y="328" text-anchor="middle" class="f-tm">マルチサイト</text>
    <text x="80" y="346" text-anchor="middle" class="f-ts">アクティブ/アクティブ</text>
    <text x="80" y="366" text-anchor="middle" class="f-ts">ほぼゼロ・最高</text>
    <rect x="160" y="316" width="90" height="50" rx="6" class="f-pub"/>
    <text x="205" y="346" text-anchor="middle" class="f-ts">稼働</text>
    <rect x="257" y="316" width="90" height="50" rx="6" class="f-pub"/>
    <text x="302" y="346" text-anchor="middle" class="f-ts">フル稼働</text>
    <rect x="354" y="316" width="90" height="50" rx="6" class="f-pub"/>
    <text x="399" y="346" text-anchor="middle" class="f-ts">本番と同じ</text>
  </g>

  <g data-s="5">
    <rect x="10" y="392" width="440" height="66" rx="6" class="f-box"/>
    <text x="230" y="418" text-anchor="middle" class="f-tb">下ほど RTO/RPO が短く、コストが高い</text>
    <text x="230" y="442" text-anchor="middle" class="f-ts">要件を満たす中で一番安い戦略を選ぶ</text>
  </g>
</svg>`,
    steps: [
      { text: "**バックアップ＆リストア**：DR リージョンにはバックアップのコピーだけ置き、障害が起きてからインフラごと作り直す。一番安いが、復旧は**時間単位**。" },
      { text: "**パイロットライト**：データベースなど**データの部分だけ常に複製して動かし**、アプリのサーバーは停止（または AMI だけ用意）しておく。障害時に起動して広げる。復旧は数十分程度。" },
      { text: "**ウォームスタンバイ**：アプリも含めた**全体の縮小版を常に動かしておく**。障害時はスケールアップして切り替えるだけなので、復旧は分単位。" },
      { text: "**マルチサイト（アクティブ/アクティブ）**：複数リージョンで**本番と同じ規模がフル稼働**。RTO/RPO はほぼゼロだが、一番高い。" },
      { text: "**つまり、DR 側で動いているものが多いほど RTO/RPO は短く、コストは高い**。試験では「要件の RTO/RPO を満たす中で一番安い」戦略を選ぶ。" }
    ]
  },

  // 9. RTO / RPO
  {
    id: "rto-rpo",
    lessons: [11],
    notes: ["災害対策（DR）戦略とRTO/RPO"],
    title: "RPOは障害の前に失う量、RTOは障害の後に止まる時間",
    svg: `<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
  ${defs("rto-rpo")}
  <g transform="translate(0,-50)">
  <path d="M20,150 L438,150" class="f-line" marker-end="url(#rto-rpo-ah)"/>
  <text x="436" y="178" text-anchor="end" class="f-ts">時間 →</text>

  <g data-s="1">
    <line x1="80" y1="132" x2="80" y2="168" class="f-line"/>
    <circle cx="80" cy="150" r="6" class="f-dot"/>
    <text x="80" y="118" text-anchor="middle" class="f-tb">最後のバックアップ</text>
  </g>

  <g data-s="2">
    <line x1="230" y1="132" x2="230" y2="168" class="f-line"/>
    <text x="230" y="118" text-anchor="middle" class="f-tng">障害発生</text>
  </g>

  <g data-s="3">
    <rect x="88" y="143" width="138" height="14" class="f-ngz"/>
    <path d="M84,196 L226,196" class="f-line" marker-start="url(#rto-rpo-ah)" marker-end="url(#rto-rpo-ah)"/>
    <text x="155" y="220" text-anchor="middle" class="f-tb">RPO</text>
    <text x="155" y="238" text-anchor="middle" class="f-ts">失うデータの量</text>
  </g>

  <g data-s="4">
    <line x1="380" y1="132" x2="380" y2="168" class="f-line"/>
    <rect x="234" y="143" width="142" height="14" class="f-priv"/>
    <text x="380" y="118" text-anchor="middle" class="f-tok">復旧</text>
    <path d="M234,196 L376,196" class="f-line" marker-start="url(#rto-rpo-ah)" marker-end="url(#rto-rpo-ah)"/>
    <text x="305" y="220" text-anchor="middle" class="f-tb">RTO</text>
    <text x="305" y="238" text-anchor="middle" class="f-ts">止まっている時間</text>
  </g>

  <g data-s="5">
    <rect x="10" y="258" width="440" height="62" rx="6" class="f-box"/>
    <text x="230" y="283" text-anchor="middle" class="f-t">RPO を短く → バックアップ・複製をこまめに</text>
    <text x="230" y="307" text-anchor="middle" class="f-t">RTO を短く → 予備を動かしておく</text>
  </g>
  </g>
</svg>`,
    steps: [
      { text: "時間は左から右へ流れる。まず、**最後にバックアップ（またはコピー）を取った時点**がある。" },
      { text: "その後のどこかで**障害**が起きる。" },
      { text: "最後のバックアップから障害までの間に書き込まれたデータは戻せない。この「失ってもよいデータの時間幅」の目標が **RPO（目標復旧時点）**。" },
      { text: "障害が起きてからシステムが**復旧**するまでの、止まっている時間の目標が **RTO（目標復旧時間）**。" },
      { text: "**つまり RPO は障害より前（どれだけデータを失うか）、RTO は障害より後（どれだけ止まるか）**。どちらも短くするほど、こまめな複製や常時稼働の予備が要るので高くつく。" }
    ]
  },

  // 10. Route 53
  {
    id: "route53",
    lessons: [10],
    notes: ["Route 53 ルーティングポリシー"],
    title: "Route 53は名前を聞かれて、答えるIPを状況で選ぶ",
    svg: `<svg viewBox="0 0 460 590" xmlns="http://www.w3.org/2000/svg">
  ${defs("route53")}
  <rect x="20" y="20" width="130" height="44" rx="6" class="f-box2"/>
  <text x="85" y="47" text-anchor="middle" class="f-tb">利用者</text>
  <rect x="290" y="20" width="150" height="44" rx="6" class="f-zone2"/>
  <text x="365" y="47" text-anchor="middle" class="f-tm">Route 53</text>

  <g data-s="1">
    <path d="M150,34 L288,34" class="f-flow" marker-end="url(#route53-am)"/>
    <text x="219" y="27" text-anchor="middle" class="f-ts">example.com は？</text>
    <path d="M290,52 L152,52" class="f-ok" marker-end="url(#route53-aok)"/>
    <text x="219" y="80" text-anchor="middle" class="f-ts">IP アドレスを返す</text>
  </g>

  <g data-s="2">
    <rect x="10" y="96" width="440" height="150" rx="10" class="f-zone"/>
    <text x="24" y="120" class="f-tb">フェイルオーバー</text>
    <rect x="24" y="140" width="100" height="70" rx="6" class="f-zone2"/>
    <text x="74" y="180" text-anchor="middle" class="f-tm">Route 53</text>
    <rect x="260" y="132" width="176" height="40" rx="6" class="f-box"/>
    <text x="348" y="157" text-anchor="middle" class="f-t">プライマリ</text>
    <rect x="260" y="192" width="176" height="40" rx="6" class="f-box"/>
    <text x="348" y="217" text-anchor="middle" class="f-t">セカンダリ</text>
    <path d="M124,166 L258,152" class="f-flow" marker-end="url(#route53-am)"/>
    <text x="190" y="148" text-anchor="middle" class="f-ts">正常時</text>
  </g>

  <g data-s="3">
    <rect x="260" y="132" width="176" height="40" rx="6" class="f-ngz"/>
    <text x="348" y="157" text-anchor="middle" class="f-tng">✕ ヘルスチェック失敗</text>
    <path d="M124,186 L258,210" class="f-ok" marker-end="url(#route53-aok)"/>
    <text x="186" y="228" text-anchor="middle" class="f-tok">セカンダリへ</text>
  </g>

  <g data-s="4">
    <rect x="10" y="262" width="440" height="150" rx="10" class="f-zone"/>
    <text x="24" y="286" class="f-tb">レイテンシー</text>
    <rect x="24" y="304" width="120" height="40" rx="6" class="f-box2"/>
    <text x="84" y="329" text-anchor="middle" class="f-t">東京の利用者</text>
    <rect x="24" y="358" width="120" height="40" rx="6" class="f-box2"/>
    <text x="84" y="383" text-anchor="middle" class="f-t">米国の利用者</text>
    <rect x="280" y="304" width="156" height="40" rx="6" class="f-box"/>
    <text x="358" y="329" text-anchor="middle" class="f-t">東京リージョン</text>
    <rect x="280" y="358" width="156" height="40" rx="6" class="f-box"/>
    <text x="358" y="383" text-anchor="middle" class="f-t">米国リージョン</text>
    <path d="M144,324 L278,324" class="f-flow" marker-end="url(#route53-am)"/>
    <text x="211" y="316" text-anchor="middle" class="f-ts">遅延が小さい方</text>
    <path d="M144,378 L278,378" class="f-flow" marker-end="url(#route53-am)"/>
    <text x="211" y="370" text-anchor="middle" class="f-ts">遅延が小さい方</text>
  </g>

  <g data-s="5">
    <rect x="10" y="428" width="440" height="150" rx="10" class="f-zone"/>
    <text x="24" y="452" class="f-tb">加重（割合で振り分け）</text>
    <rect x="24" y="474" width="100" height="70" rx="6" class="f-zone2"/>
    <text x="74" y="514" text-anchor="middle" class="f-tm">Route 53</text>
    <rect x="260" y="466" width="176" height="40" rx="6" class="f-box"/>
    <text x="348" y="491" text-anchor="middle" class="f-t">旧バージョン</text>
    <rect x="260" y="526" width="176" height="40" rx="6" class="f-zone2"/>
    <text x="348" y="551" text-anchor="middle" class="f-tm">新バージョン</text>
    <path d="M124,500 L258,486" class="f-flow" marker-end="url(#route53-am)"/>
    <text x="190" y="481" text-anchor="middle" class="f-ts">重み 9（90%）</text>
    <path d="M124,520 L258,544" class="f-flow" marker-end="url(#route53-am)"/>
    <text x="186" y="560" text-anchor="middle" class="f-ts">重み 1（10%）</text>
  </g>
</svg>`,
    steps: [
      { text: "**Route 53** は AWS の DNS。利用者に「example.com は？」と聞かれ、**IP アドレスを答える**。どの IP を答えるかを決めるのが**ルーティングポリシー**。" },
      { text: "**フェイルオーバー**：正常なときは**プライマリ**の IP を答える。Route 53 の**ヘルスチェック**で見張っておく。" },
      { text: "プライマリのヘルスチェックが失敗すると、**セカンダリ**の IP を答えるように切り替わる。アクティブ/パッシブの DR で使う。" },
      { text: "**レイテンシー**：利用者から見て**遅延が一番小さいリージョン**を答える。単純な距離ではなく、計測した遅延で選ぶ（国で分けたいなら位置情報ポリシー）。" },
      { text: "**加重**：重みの割合で答えを分ける。9:1 にすると新バージョンに 1 割だけ流せるので、**段階的な移行（カナリア）**に使う。**つまり「壊れたら予備へ」→ フェイルオーバー、「速いリージョンへ」→ レイテンシー、「一部だけ新しい方へ」→ 加重**。" }
    ]
  }
  );
})();
