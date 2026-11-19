window.FIGS = window.FIGS || {};
window.FIGS.saa = window.FIGS.saa || [];
(function () {
  // 図ごとに一意な id の矢じりを作る（am=青, ang=赤, aok=緑, ah=灰）
  const M = (id) => `<defs>
    <marker id="${id}-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="${id}-ang" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahng"/></marker>
    <marker id="${id}-aok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahok"/></marker>
    <marker id="${id}-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ah"/></marker>
  </defs>`;

  window.FIGS.saa.push(
    // 1. サーバーとは
    {
      id: "server-basics",
      lessons: [0],
      notes: [],
      title: "サーバーは、頼まれたら答えるために待っているコンピューター",
      svg: `<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
  ${M("server-basics")}
  <rect x="20" y="60" width="130" height="80" rx="8" class="f-box"/>
  <text x="85" y="90" text-anchor="middle" class="f-tb">利用者</text>
  <text x="85" y="110" text-anchor="middle" class="f-ts">PC・スマホ</text>
  <text x="85" y="128" text-anchor="middle" class="f-ts">（クライアント）</text>

  <g data-s="1">
    <rect x="310" y="60" width="130" height="80" rx="8" class="f-zone2"/>
    <text x="375" y="90" text-anchor="middle" class="f-tm">サーバー</text>
    <text x="375" y="110" text-anchor="middle" class="f-ts">つけっぱなし</text>
    <circle cx="375" cy="126" r="5" class="f-dot"/>
    <text x="375" y="162" text-anchor="middle" class="f-ts">ずっと待っている</text>
  </g>

  <g data-s="2">
    <path d="M150,82 L308,82" class="f-flow" marker-end="url(#server-basics-am)"/>
    <text x="230" y="72" text-anchor="middle" class="f-tm">リクエスト</text>
    <text x="230" y="100" text-anchor="middle" class="f-ts">ページをください</text>
  </g>

  <g data-s="3">
    <path d="M310,120 L152,120" class="f-flow" marker-end="url(#server-basics-am)"/>
    <text x="230" y="140" text-anchor="middle" class="f-tm">レスポンス</text>
    <text x="230" y="158" text-anchor="middle" class="f-ts">ページのデータ</text>
  </g>

  <g data-s="4">
    <rect x="20" y="190" width="240" height="96" rx="8" class="f-box2"/>
    <text x="34" y="218" class="f-tb">頼む側＝クライアント</text>
    <text x="34" y="244" class="f-tb">答える側＝サーバー</text>
    <text x="34" y="270" class="f-ts">AWSはサーバーを借りる所</text>
    <text x="370" y="184" text-anchor="middle" class="f-ts">サーバーの中身</text>
    <rect x="290" y="194" width="160" height="28" rx="5" class="f-box"/>
    <text x="370" y="213" text-anchor="middle" class="f-ts">アプリ</text>
    <rect x="290" y="226" width="160" height="28" rx="5" class="f-box"/>
    <text x="370" y="245" text-anchor="middle" class="f-ts">OS（Linuxなど）</text>
    <rect x="290" y="258" width="160" height="28" rx="5" class="f-box"/>
    <text x="370" y="277" text-anchor="middle" class="f-ts">CPU・メモリ・ディスク</text>
  </g>
</svg>`,
      steps: [
        { text: "右に **サーバー** を置く。電源を入れたままにして、誰かから頼まれるのを **ずっと待っている** コンピューター。" },
        { text: "左の利用者（PC やスマホ＝**クライアント**）が「このページをください」と **リクエスト**（お願い）を送る。" },
        { text: "サーバーは中で処理して、ページのデータを **レスポンス**（答え）として返す。これが Web サイトを開くたびに起きている。" },
        { text: "サーバーの中身はふつうの PC と同じで、CPU・メモリ・ディスクの上に OS、その上にアプリが動く。**つまり**、サーバーは「頼まれたら答える役」のコンピューターで、AWS の話はこのサーバーをどこにどう置くかの話。" }
      ]
    },

    // 2. クラウドとオンプレミス
    {
      id: "cloud-vs-onprem",
      lessons: [1],
      notes: [],
      title: "クラウドは「買う」でなく「借りる」。すぐ使えて使った分だけ払う",
      svg: `<svg viewBox="0 0 460 545" xmlns="http://www.w3.org/2000/svg">
  ${M("cloud-vs-onprem")}
  <g data-s="1">
    <rect x="10" y="10" width="210" height="40" rx="8" class="f-box2"/>
    <text x="115" y="35" text-anchor="middle" class="f-tb">自前のサーバー室</text>
    <rect x="30" y="70" width="170" height="36" rx="6" class="f-box"/>
    <text x="115" y="93" text-anchor="middle" class="f-t">① 買う（発注）</text>
    <path d="M115,106 L115,124" class="f-line" marker-end="url(#cloud-vs-onprem-ah)"/>
    <rect x="30" y="126" width="170" height="36" rx="6" class="f-box"/>
    <text x="115" y="149" text-anchor="middle" class="f-t">② 届く・設置</text>
    <path d="M115,162 L115,180" class="f-line" marker-end="url(#cloud-vs-onprem-ah)"/>
    <rect x="30" y="182" width="170" height="36" rx="6" class="f-priv"/>
    <text x="115" y="205" text-anchor="middle" class="f-t">③ 数週間後に使える</text>
  </g>

  <g data-s="2">
    <rect x="240" y="10" width="210" height="40" rx="8" class="f-zone2"/>
    <text x="345" y="35" text-anchor="middle" class="f-tm">クラウド（AWS）</text>
    <rect x="260" y="70" width="170" height="36" rx="6" class="f-box"/>
    <text x="345" y="93" text-anchor="middle" class="f-t">① 申し込む</text>
    <path d="M345,106 L345,124" class="f-line" marker-end="url(#cloud-vs-onprem-ah)"/>
    <rect x="260" y="126" width="170" height="36" rx="6" class="f-pub"/>
    <text x="345" y="149" text-anchor="middle" class="f-t">② 数分で使える</text>
    <rect x="260" y="182" width="170" height="36" rx="6" class="f-box"/>
    <text x="345" y="205" text-anchor="middle" class="f-t">いらなければ返す</text>
  </g>

  <g data-s="3">
    <text x="115" y="252" text-anchor="middle" class="f-ts">ピークに合わせて買う</text>
    <rect x="40" y="262" width="150" height="40" class="f-ngz"/>
    <text x="115" y="287" text-anchor="middle" class="f-tng">余り（ムダ）</text>
    <rect x="40" y="302" width="150" height="40" class="f-pub"/>
    <text x="115" y="327" text-anchor="middle" class="f-t">使っている分</text>
    <text x="115" y="364" text-anchor="middle" class="f-tng">余っても払う</text>

    <text x="345" y="252" text-anchor="middle" class="f-ts">必要な分だけ借りる</text>
    <rect x="270" y="262" width="150" height="40" class="f-zone"/>
    <text x="345" y="287" text-anchor="middle" class="f-ts">増やすのも自由</text>
    <rect x="270" y="302" width="150" height="40" class="f-pub"/>
    <text x="345" y="327" text-anchor="middle" class="f-t">使っている分</text>
    <text x="345" y="364" text-anchor="middle" class="f-tok">使った分だけ払う</text>
  </g>

  <g data-s="4">
    <text x="230" y="396" text-anchor="middle" class="f-tb">責任共有モデル</text>
    <rect x="10" y="408" width="440" height="58" rx="8" class="f-priv"/>
    <text x="24" y="430" class="f-tb">利用者が守る</text>
    <text x="24" y="452" class="f-ts">データ・権限の設定・OS 以上（EC2 の場合）</text>
    <rect x="10" y="474" width="440" height="58" rx="8" class="f-zone2"/>
    <text x="24" y="496" class="f-tm">AWS が守る</text>
    <text x="24" y="518" class="f-ts">建物・電源・機器・仮想化の土台</text>
  </g>
</svg>`,
      steps: [
        { text: "昔ながらの **オンプレミス**（自前のサーバー室）。サーバーを買って、届いて、設置して…と、使えるまで **数週間〜数か月** かかる。" },
        { text: "**クラウド** では、画面やコマンドで申し込めば **数分** でサーバーが用意される。いらなくなればすぐ返せる。" },
        { text: "お金の違い。自前だと一番忙しい日に合わせて多めに買うので、ふだんは **余っても払う**。クラウドは **使った分だけ払う**（従量課金）で、足りなければ増やせる。" },
        { text: "ただし全部 AWS 任せではない。**AWS は建物・機器などの土台**、**利用者はその上の OS（EC2 の場合）・データ・権限の設定** を守る（責任共有モデル）。**つまり**、クラウドは「買う」から「借りる」への切り替えで、上に載せる中身の安全は自分の責任。" }
      ]
    },

    // 3. リージョンとAZ
    {
      id: "region-az",
      lessons: [2],
      notes: [],
      title: "リージョンの中に独立したAZが複数。2つのAZに置けば止まりにくい",
      svg: `<svg viewBox="0 0 460 420" xmlns="http://www.w3.org/2000/svg">
  ${M("region-az")}
  <g data-s="1">
    <rect x="10" y="10" width="440" height="250" rx="10" class="f-zone"/>
    <text x="24" y="34" class="f-tb">東京リージョン</text>
    <text x="132" y="34" class="f-ts">ap-northeast-1</text>
  </g>

  <g data-s="2">
    <rect x="22" y="48" width="132" height="200" rx="8" class="f-zone"/>
    <text x="34" y="72" class="f-tb">AZ 1a</text>
    <rect x="34" y="84" width="108" height="26" rx="4" class="f-box2"/>
    <text x="88" y="102" text-anchor="middle" class="f-ts">データセンター</text>
    <rect x="34" y="116" width="108" height="26" rx="4" class="f-box2"/>
    <text x="88" y="134" text-anchor="middle" class="f-ts">データセンター</text>

    <rect x="164" y="48" width="132" height="200" rx="8" class="f-zone"/>
    <text x="176" y="72" class="f-tb">AZ 1c</text>
    <rect x="176" y="84" width="108" height="26" rx="4" class="f-box2"/>
    <text x="230" y="102" text-anchor="middle" class="f-ts">データセンター</text>
    <rect x="176" y="116" width="108" height="26" rx="4" class="f-box2"/>
    <text x="230" y="134" text-anchor="middle" class="f-ts">データセンター</text>

    <rect x="306" y="48" width="132" height="200" rx="8" class="f-zone"/>
    <text x="318" y="72" class="f-tb">AZ 1d</text>
    <rect x="318" y="84" width="108" height="26" rx="4" class="f-box2"/>
    <text x="372" y="102" text-anchor="middle" class="f-ts">データセンター</text>
    <rect x="318" y="116" width="108" height="26" rx="4" class="f-box2"/>
    <text x="372" y="134" text-anchor="middle" class="f-ts">データセンター</text>
    <text x="372" y="190" text-anchor="middle" class="f-ts">電源・回線も別</text>
  </g>

  <g data-s="3">
    <rect x="38" y="170" width="100" height="40" rx="6" class="f-box"/>
    <text x="88" y="195" text-anchor="middle" class="f-t">サーバー</text>
    <rect x="180" y="170" width="100" height="40" rx="6" class="f-box"/>
    <text x="230" y="195" text-anchor="middle" class="f-t">サーバー</text>
    <rect x="160" y="310" width="140" height="44" rx="8" class="f-box2"/>
    <text x="230" y="337" text-anchor="middle" class="f-t">利用者</text>
    <path d="M220,310 L92,214" class="f-flow" marker-end="url(#region-az-am)"/>
    <path d="M230,310 L230,214" class="f-flow" marker-end="url(#region-az-am)"/>
    <text x="312" y="337" class="f-ts">AZごとに1台ずつ</text>
  </g>

  <g data-s="4">
    <rect x="22" y="48" width="132" height="200" rx="8" class="f-ngz"/>
    <text x="88" y="140" text-anchor="middle" class="f-tng">AZ 1a 停止</text>
    <text x="88" y="160" text-anchor="middle" class="f-ts">停電・火災など</text>
    <text x="158" y="282" text-anchor="middle" class="f-tng">✕</text>
    <text x="230" y="384" text-anchor="middle" class="f-tok">もう1台で動き続ける</text>
    <text x="230" y="408" text-anchor="middle" class="f-tm">複数AZに分ける＝高可用性</text>
  </g>
</svg>`,
      steps: [
        { text: "AWS のデータセンターは地域ごとにまとまっていて、そのまとまりを **リージョン** と呼ぶ。日本なら東京と大阪。" },
        { text: "リージョンの中には **AZ（アベイラビリティーゾーン）** が複数ある。AZ は 1 つ以上のデータセンターでできていて、**電源・回線が別々**、場所も離れている。" },
        { text: "同じ役目のサーバーを **AZ 1a と AZ 1c に 1 台ずつ** 置き、利用者からの通信を両方に振り分ける。" },
        { text: "AZ 1a が停電で止まっても、AZ 1c のサーバーが動き続けるのでサービスは止まらない。**つまり**、「**複数の AZ に分けて置く**」が高可用性の基本で、試験で何度も出る。" }
      ]
    },

    // 4. IPアドレスとサブネット
    {
      id: "ip-subnet",
      lessons: [3],
      notes: [],
      title: "/16 の大きな範囲を /24 の区画（サブネット）に分ける",
      svg: `<svg viewBox="0 0 460 510" xmlns="http://www.w3.org/2000/svg">
  ${M("ip-subnet")}
  <g data-s="1">
    <text x="20" y="30" class="f-tb">VPC の範囲 10.0.0.0/16</text>
    <rect x="20" y="44" width="96" height="40" rx="6" class="f-zone2"/>
    <text x="68" y="69" text-anchor="middle" class="f-tb">10</text>
    <rect x="128" y="44" width="96" height="40" rx="6" class="f-zone2"/>
    <text x="176" y="69" text-anchor="middle" class="f-tb">0</text>
    <rect x="236" y="44" width="96" height="40" rx="6" class="f-box"/>
    <text x="284" y="69" text-anchor="middle" class="f-t">0〜255</text>
    <rect x="344" y="44" width="96" height="40" rx="6" class="f-box"/>
    <text x="392" y="69" text-anchor="middle" class="f-t">0〜255</text>
    <text x="122" y="102" text-anchor="middle" class="f-ts">固定（先頭16ビット）</text>
    <text x="338" y="102" text-anchor="middle" class="f-ts">自由（256×256）</text>
    <text x="230" y="126" text-anchor="middle" class="f-tm">＝ 65,536個（約6.5万）</text>
  </g>

  <g data-s="2">
    <rect x="10" y="146" width="440" height="146" rx="10" class="f-zone"/>
    <text x="24" y="170" class="f-tb">/24 の区画（サブネット）に分ける</text>
    <rect x="24" y="182" width="412" height="28" rx="5" class="f-pub"/>
    <text x="36" y="201" class="f-t">10.0.1.0/24</text>
    <text x="424" y="201" text-anchor="end" class="f-ts">Web 用・256個</text>
    <rect x="24" y="216" width="412" height="28" rx="5" class="f-priv"/>
    <text x="36" y="235" class="f-t">10.0.2.0/24</text>
    <text x="424" y="235" text-anchor="end" class="f-ts">DB 用・256個</text>
    <rect x="24" y="250" width="412" height="28" rx="5" class="f-box"/>
    <text x="36" y="269" class="f-t">10.0.3.0/24</text>
    <text x="424" y="269" text-anchor="end" class="f-ts">…最大256区画</text>
  </g>

  <g data-s="3">
    <text x="20" y="322" class="f-tb">10.0.1.0/24 の256個の中身</text>
    <rect x="20" y="334" width="40" height="40" rx="4" class="f-ngz"/>
    <text x="40" y="359" text-anchor="middle" class="f-ts">.0</text>
    <rect x="62" y="334" width="40" height="40" rx="4" class="f-ngz"/>
    <text x="82" y="359" text-anchor="middle" class="f-ts">.1</text>
    <rect x="104" y="334" width="40" height="40" rx="4" class="f-ngz"/>
    <text x="124" y="359" text-anchor="middle" class="f-ts">.2</text>
    <rect x="146" y="334" width="40" height="40" rx="4" class="f-ngz"/>
    <text x="166" y="359" text-anchor="middle" class="f-ts">.3</text>
    <rect x="188" y="334" width="196" height="40" rx="4" class="f-pub"/>
    <text x="286" y="359" text-anchor="middle" class="f-t">.4〜.254 ＝ 251個</text>
    <rect x="386" y="334" width="54" height="40" rx="4" class="f-ngz"/>
    <text x="413" y="359" text-anchor="middle" class="f-ts">.255</text>
    <text x="103" y="394" text-anchor="middle" class="f-tng">AWS が予約</text>
    <text x="413" y="394" text-anchor="middle" class="f-tng">予約</text>
    <text x="286" y="394" text-anchor="middle" class="f-tok">使える</text>
    <text x="230" y="418" text-anchor="middle" class="f-ts">先頭4つ＋最後の1つ＝5個は使えない</text>
  </g>

  <g data-s="4">
    <rect x="10" y="436" width="440" height="64" rx="8" class="f-zone2"/>
    <text x="230" y="461" text-anchor="middle" class="f-tm">/ の後ろが大きいほど範囲は狭い</text>
    <text x="230" y="485" text-anchor="middle" class="f-ts">/16＝65,536個　/24＝256個（使えるのは251）</text>
  </g>
</svg>`,
      steps: [
        { text: "VPC の住所の範囲を **10.0.0.0/16** にする。「/16」は先頭 16 ビット（10.0 の部分）が固定という意味。残り 2 つの数字が自由に動くので **256×256＝65,536 個**。" },
        { text: "この大きな範囲を **/24** の区画に切り分けたものが **サブネット**。/24 は 10.0.1 まで固定で、最後の数字だけ動くので **256 個**。Web 用、DB 用…と用途ごとに分ける。" },
        { text: "/24 の 256 個のうち、AWS は **先頭 4 つ（.0〜.3）と最後の 1 つ（.255）の計 5 個を予約** している。だから実際に使えるのは **251 個**。" },
        { text: "**つまり**、スラッシュの後ろの数字が大きいほど範囲は狭い。/16 は約 6.5 万個、/24 は 256 個（AWS では使えるのは 251 個）。" }
      ]
    },

    // 5. SG vs NACL
    {
      id: "sg-vs-nacl",
      lessons: [4],
      notes: ["セキュリティグループ vs ネットワークACL"],
      title: "NACLはサブネットの境界でステートレス、SGはインスタンス単位でステートフル",
      svg: `<svg viewBox="0 0 460 545" xmlns="http://www.w3.org/2000/svg">
  ${M("sg-vs-nacl")}
  <rect x="210" y="10" width="180" height="40" rx="20" class="f-box2"/>
  <text x="300" y="35" text-anchor="middle" class="f-tb">インターネット</text>

  <g data-s="1">
    <rect x="24" y="163" width="412" height="307" rx="8" class="f-pub"/>
    <text x="36" y="458" class="f-tb">サブネット</text>
    <rect x="24" y="140" width="412" height="46" rx="6" class="f-priv"/>
    <text x="36" y="160" class="f-tb">ネットワークACL</text>
    <text x="36" y="177" class="f-ts">サブネットの境界</text>
    <rect x="30" y="300" width="400" height="130" rx="8" class="f-zone2"/>
    <text x="44" y="330" class="f-tb">セキュリティグループ</text>
    <text x="44" y="347" class="f-ts">インスタンス単位</text>
    <rect x="222" y="360" width="192" height="50" rx="6" class="f-box"/>
    <text x="318" y="390" text-anchor="middle" class="f-tb">EC2</text>
  </g>

  <g data-s="2">
    <path d="M275,50 L275,358" class="f-ok" marker-end="url(#sg-vs-nacl-aok)"/>
    <path d="M335,360 L335,52" class="f-ok" marker-end="url(#sg-vs-nacl-aok)"/>
    <text x="268" y="270" text-anchor="end" class="f-ts">行き</text>
    <text x="343" y="270" class="f-ts">帰り</text>
    <text x="36" y="210" class="f-ts">受信 443 を許可</text>
    <text x="36" y="228" class="f-ts">送信 1024-65535 も許可</text>
    <text x="36" y="250" class="f-tm">行きも帰りもルールが要る</text>
  </g>

  <g data-s="3">
    <text x="44" y="372" class="f-ts">受信 443 を許可</text>
    <text x="44" y="390" class="f-tok">帰りは自動で通る</text>
    <text x="44" y="408" class="f-ts">（ステートフル）</text>
  </g>

  <g data-s="4">
    <rect x="24" y="10" width="140" height="40" rx="8" class="f-ngz"/>
    <text x="94" y="35" text-anchor="middle" class="f-tng">怪しい IP</text>
    <path d="M94,50 L94,136" class="f-ng" marker-end="url(#sg-vs-nacl-ang)"/>
    <text x="104" y="100" class="f-tng">NACL で Deny</text>
    <text x="230" y="500" text-anchor="middle" class="f-tng">Deny（拒否）を書けるのは NACL だけ</text>
    <text x="230" y="522" text-anchor="middle" class="f-ts">SG は許可ルールしか書けない</text>
  </g>
</svg>`,
      steps: [
        { text: "門番は 2 種類。**ネットワークACL（NACL）** は **サブネットの境界** に立つ門番、**セキュリティグループ（SG）** は **EC2 などのインスタンスごと**（正確には ENI ごと）の門番。" },
        { text: "NACL は **ステートレス**。行き（受信 443）を許可しても帰りは自動では通らないので、**帰りの通信（エフェメラルポート 1024-65535 など）も送信ルールで許可** する必要がある。" },
        { text: "SG は **ステートフル**。受信 443 を許可すれば、その **帰りの通信は自動で通る**。帰りのルールを書く必要はない。" },
        { text: "特定の怪しい IP を止めたいときは、NACL に **Deny（拒否）ルール** を書く。SG は許可ルールしか書けない。**つまり**、「IP をブロック」→ NACL、「帰りは自動」→ SG。" }
      ]
    },

    // 6. VPCエンドポイント
    {
      id: "vpc-endpoints",
      lessons: [],
      notes: ["VPCエンドポイント（Gateway型 / Interface型）とPrivateLink"],
      title: "S3へはNATでなくGateway型エンドポイント。他の多くのサービスはInterface型",
      svg: `<svg viewBox="0 0 460 560" xmlns="http://www.w3.org/2000/svg">
  ${M("vpc-endpoints")}
  <rect x="20" y="10" width="150" height="40" rx="20" class="f-box2"/>
  <text x="95" y="35" text-anchor="middle" class="f-t">インターネット</text>
  <rect x="300" y="10" width="150" height="44" rx="8" class="f-box"/>
  <text x="375" y="37" text-anchor="middle" class="f-tb">Amazon S3</text>

  <rect x="10" y="80" width="440" height="400" rx="10" class="f-zone"/>
  <text x="24" y="104" class="f-tb">VPC</text>
  <rect x="60" y="64" width="80" height="32" rx="6" class="f-box2"/>
  <text x="100" y="85" text-anchor="middle" class="f-t">IGW</text>
  <rect x="24" y="112" width="200" height="84" rx="8" class="f-pub"/>
  <text x="112" y="130" class="f-ts">パブリック</text>
  <rect x="40" y="136" width="120" height="40" rx="6" class="f-box"/>
  <text x="100" y="161" text-anchor="middle" class="f-t">NAT GW</text>
  <rect x="24" y="212" width="412" height="256" rx="8" class="f-priv"/>
  <text x="200" y="236" class="f-tb">プライベート</text>
  <rect x="300" y="250" width="120" height="44" rx="6" class="f-box"/>
  <text x="360" y="277" text-anchor="middle" class="f-tb">EC2</text>

  <g data-s="1">
    <path d="M300,264 C200,264 100,240 100,178" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
    <path d="M100,136 L100,98" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
    <path d="M100,64 L100,52" class="f-flow"/>
    <path d="M170,30 L298,30" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
    <text x="234" y="50" text-anchor="middle" class="f-tm">① NAT 経由</text>
    <text x="234" y="68" text-anchor="middle" class="f-ts">処理料金がかかる</text>
  </g>

  <g data-s="2">
    <rect x="300" y="64" width="150" height="32" rx="6" class="f-zone2"/>
    <text x="375" y="85" text-anchor="middle" class="f-tm">Gateway型 EP</text>
    <path d="M360,248 L360,98" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
    <path d="M375,64 L375,56" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
    <text x="352" y="172" text-anchor="end" class="f-tm">② 無料</text>
    <text x="352" y="190" text-anchor="end" class="f-ts">S3・DynamoDBのみ</text>
    <rect x="40" y="300" width="240" height="50" rx="6" class="f-box"/>
    <text x="52" y="320" class="f-ts">ルートテーブル</text>
    <text x="52" y="340" class="f-t">S3宛て → Gateway型EP</text>
  </g>

  <g data-s="3">
    <rect x="40" y="380" width="170" height="56" rx="6" class="f-zone2"/>
    <text x="125" y="403" text-anchor="middle" class="f-tm">③ Interface型 EP</text>
    <text x="125" y="424" text-anchor="middle" class="f-ts">ENI・有料</text>
    <path d="M360,296 C360,380 280,408 212,408" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
    <rect x="20" y="500" width="200" height="44" rx="8" class="f-box"/>
    <text x="120" y="527" text-anchor="middle" class="f-t">SQS・KMSなど多数</text>
    <path d="M125,438 L125,498" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
  </g>

  <g data-s="4">
    <rect x="280" y="500" width="170" height="44" rx="8" class="f-box2"/>
    <text x="365" y="527" text-anchor="middle" class="f-tb">オンプレミス</text>
    <path d="M365,500 C365,450 280,422 212,422" class="f-flow" marker-end="url(#vpc-endpoints-am)"/>
    <text x="378" y="458" class="f-ts">DX/VPN</text>
  </g>
</svg>`,
      steps: [
        { text: "プライベートサブネットの EC2 から S3 を使いたい。何もしなければ **NAT ゲートウェイ → IGW → インターネット側** を通って S3 に行く。大量に通すと **NAT のデータ処理料金** がかさむ。" },
        { text: "**Gateway 型エンドポイント** を作り、ルートテーブルに「S3 宛て → エンドポイント」を追加すると、インターネットを通らずに S3 へ行ける。対象は **S3 と DynamoDB だけ** で、**追加料金なし**。" },
        { text: "それ以外の多くのサービス（SQS、KMS など）は **Interface 型エンドポイント**。サブネットに **ENI（プライベート IP）** ができ、そこを入口にする（AWS PrivateLink）。**時間課金＋データ処理料金** がかかる。" },
        { text: "Interface 型は **オンプレミスから Direct Connect / VPN 経由でも使える**（Gateway 型は使えない）。**つまり**、「S3 への通信を安く・NAT を通さず」→ Gateway 型、「オンプレからも」「S3/DynamoDB 以外」→ Interface 型。" }
      ]
    },

    // 7. VPC間・オンプレミス接続
    {
      id: "vpc-connect",
      lessons: [],
      notes: ["VPC間・オンプレミス接続（Peering / Transit Gateway / VPN / Direct Connect）"],
      title: "Peeringは推移しない→多数ならTransit Gateway。オンプレはVPNかDX",
      svg: `<svg viewBox="0 0 460 550" xmlns="http://www.w3.org/2000/svg">
  ${M("vpc-connect")}
  <g data-s="1">
    <rect x="20" y="40" width="100" height="50" rx="8" class="f-zone"/>
    <text x="70" y="70" text-anchor="middle" class="f-tb">VPC A</text>
    <rect x="180" y="40" width="100" height="50" rx="8" class="f-zone"/>
    <text x="230" y="70" text-anchor="middle" class="f-tb">VPC B</text>
    <rect x="340" y="40" width="100" height="50" rx="8" class="f-zone"/>
    <text x="390" y="70" text-anchor="middle" class="f-tb">VPC C</text>
    <path d="M120,65 L180,65" class="f-ok"/>
    <path d="M280,65 L340,65" class="f-ok"/>
    <text x="150" y="56" text-anchor="middle" class="f-ts">Peering</text>
    <text x="310" y="56" text-anchor="middle" class="f-ts">Peering</text>
    <text x="230" y="24" text-anchor="middle" class="f-ts">1対1でつなぐ</text>
  </g>

  <g data-s="2">
    <path d="M70,92 C70,150 390,150 390,94" class="f-ng" marker-end="url(#vpc-connect-ang)"/>
    <text x="230" y="160" text-anchor="middle" class="f-tng">A → C は通らない</text>
    <text x="230" y="178" text-anchor="middle" class="f-ts">（B を経由しない＝推移しない）</text>
  </g>

  <g data-s="3">
    <text x="230" y="210" text-anchor="middle" class="f-tok">ハブ経由なら A → C も通る</text>
    <rect x="20" y="222" width="100" height="40" rx="8" class="f-zone"/>
    <text x="70" y="247" text-anchor="middle" class="f-tb">A</text>
    <rect x="180" y="222" width="100" height="40" rx="8" class="f-zone"/>
    <text x="230" y="247" text-anchor="middle" class="f-tb">B</text>
    <rect x="340" y="222" width="100" height="40" rx="8" class="f-zone"/>
    <text x="390" y="247" text-anchor="middle" class="f-tb">C</text>
    <path d="M70,262 L160,310" class="f-ok"/>
    <path d="M230,262 L230,310" class="f-ok"/>
    <path d="M390,262 L300,310" class="f-ok"/>
    <rect x="150" y="310" width="160" height="44" rx="8" class="f-zone2"/>
    <text x="230" y="337" text-anchor="middle" class="f-tm">Transit Gateway</text>
  </g>

  <g data-s="4">
    <path d="M180,354 L180,488" class="f-flow" marker-end="url(#vpc-connect-am)" marker-start="url(#vpc-connect-am)"/>
    <path d="M280,354 L280,488" class="f-flow" marker-end="url(#vpc-connect-am)" marker-start="url(#vpc-connect-am)"/>
    <text x="172" y="404" text-anchor="end" class="f-tm">VPN</text>
    <text x="172" y="424" text-anchor="end" class="f-ts">ネット経由</text>
    <text x="172" y="442" text-anchor="end" class="f-ts">すぐ・安い</text>
    <text x="288" y="404" class="f-tm">Direct Connect</text>
    <text x="288" y="424" class="f-ts">専用線・安定</text>
    <text x="288" y="442" class="f-ts">開通に数週間〜</text>
    <rect x="150" y="490" width="160" height="44" rx="8" class="f-box2"/>
    <text x="230" y="517" text-anchor="middle" class="f-tb">オンプレミス</text>
  </g>
</svg>`,
      steps: [
        { text: "**VPC Peering** は 2 つの VPC を **1 対 1** でつなぐ。A-B と B-C をそれぞれつないだ。" },
        { text: "でも **A から C へは通らない**。Peering は **推移しない**（B を中継してくれない）。A-C も使うなら A-C の Peering を別に作る必要があり、VPC が増えると線だらけになる。" },
        { text: "**Transit Gateway** を真ん中のハブにして、各 VPC をつなぐ。ハブ経由なら **A → C も通る**（推移的ルーティング可）。VPC が多いならこちら。" },
        { text: "オンプレミスとは 2 通り。**Site-to-Site VPN** はインターネット経由の暗号化接続で **すぐ・安く** 作れる。**Direct Connect** は **専用線で帯域が安定** するが、**開通まで数週間以上** かかることがある。**つまり**、「多数の VPC」→ Transit Gateway、「すぐ・安く」→ VPN、「安定した帯域」→ Direct Connect。" }
      ]
    },

    // 8. IAMポリシーの評価ロジック
    {
      id: "iam-eval",
      lessons: [5],
      notes: ["IAMポリシーの評価ロジック"],
      title: "明示的Denyが最優先、Allowが無ければ暗黙の拒否",
      svg: `<svg viewBox="0 0 460 500" xmlns="http://www.w3.org/2000/svg">
  ${M("iam-eval")}
  <rect x="20" y="10" width="260" height="44" rx="8" class="f-box2"/>
  <text x="150" y="37" text-anchor="middle" class="f-tb">リクエスト：S3を読みたい</text>

  <g data-s="1">
    <path d="M150,54 L150,88" class="f-line" marker-end="url(#iam-eval-ah)"/>
    <rect x="20" y="90" width="260" height="50" rx="8" class="f-box"/>
    <text x="150" y="120" text-anchor="middle" class="f-t">① 明示的な Deny がある？</text>
    <path d="M280,115 L328,115" class="f-ng" marker-end="url(#iam-eval-ang)"/>
    <text x="304" y="107" text-anchor="middle" class="f-ts">ある</text>
    <rect x="330" y="95" width="120" height="40" rx="8" class="f-ngz"/>
    <text x="390" y="120" text-anchor="middle" class="f-tng">拒否</text>
  </g>

  <g data-s="2">
    <path d="M150,140 L150,178" class="f-line" marker-end="url(#iam-eval-ah)"/>
    <text x="160" y="164" class="f-ts">ない</text>
    <rect x="20" y="180" width="260" height="50" rx="8" class="f-box"/>
    <text x="150" y="210" text-anchor="middle" class="f-t">② SCP などの上限の内側？</text>
    <path d="M280,205 L328,205" class="f-ng" marker-end="url(#iam-eval-ang)"/>
    <text x="304" y="197" text-anchor="middle" class="f-ts">外</text>
    <rect x="330" y="185" width="120" height="40" rx="8" class="f-ngz"/>
    <text x="390" y="210" text-anchor="middle" class="f-tng">拒否</text>
  </g>

  <g data-s="3">
    <path d="M150,230 L150,268" class="f-line" marker-end="url(#iam-eval-ah)"/>
    <text x="160" y="254" class="f-ts">内側</text>
    <rect x="20" y="270" width="260" height="50" rx="8" class="f-box"/>
    <text x="150" y="300" text-anchor="middle" class="f-t">③ Allow がある？</text>
    <path d="M280,295 L328,295" class="f-ok" marker-end="url(#iam-eval-aok)"/>
    <text x="304" y="287" text-anchor="middle" class="f-ts">ある</text>
    <rect x="330" y="275" width="120" height="40" rx="8" class="f-pub"/>
    <text x="390" y="300" text-anchor="middle" class="f-tok">許可</text>
  </g>

  <g data-s="4">
    <path d="M150,320 L150,358" class="f-line" marker-end="url(#iam-eval-ah)"/>
    <text x="160" y="344" class="f-ts">ない</text>
    <rect x="20" y="360" width="260" height="56" rx="8" class="f-ngz"/>
    <text x="150" y="384" text-anchor="middle" class="f-tng">暗黙の拒否</text>
    <text x="150" y="404" text-anchor="middle" class="f-ts">何も書いてなければダメ</text>
    <rect x="10" y="436" width="440" height="50" rx="8" class="f-zone2"/>
    <text x="230" y="466" text-anchor="middle" class="f-tm">明示的 Deny ＞ Allow ＞ 暗黙の拒否</text>
  </g>
</svg>`,
      steps: [
        { text: "まず、関係するポリシーのどこか 1 つにでも **明示的な Deny**（はっきり禁止）があるかを見る。あれば、ほかで許可されていても **必ず拒否**。" },
        { text: "次に **SCP・アクセス許可の境界** などの「上限」の内側かを見る。上限の外の操作は拒否。上限は枠を決めるだけで、**それ自体は許可を与えない**。" },
        { text: "上限の内側で、アイデンティティベースやリソースベースのポリシーに **Allow** があれば **許可**。" },
        { text: "どこにも Allow が無ければ **暗黙の拒否**（デフォルトは全部ダメ）。**つまり**、強さは **明示的 Deny ＞ Allow ＞ 暗黙の拒否**。権限は必要な分だけ足していく（最小権限）。" }
      ]
    },

    // 9. IAMロールとSTS
    {
      id: "iam-role-sts",
      lessons: [],
      notes: ["IAMロールとSTS（一時的な認証情報）"],
      title: "EC2にはロールを付け、STSの期限つきの鍵でS3を使う",
      svg: `<svg viewBox="0 0 460 470" xmlns="http://www.w3.org/2000/svg">
  ${M("iam-role-sts")}
  <rect x="20" y="140" width="150" height="60" rx="8" class="f-box"/>
  <text x="95" y="168" text-anchor="middle" class="f-tb">EC2</text>
  <text x="95" y="188" text-anchor="middle" class="f-ts">アプリ</text>

  <g data-s="1">
    <rect x="20" y="10" width="200" height="86" rx="8" class="f-zone2"/>
    <text x="32" y="32" class="f-tm">IAMロール</text>
    <text x="32" y="52" class="f-ts">誰が使える：EC2</text>
    <text x="32" y="70" class="f-ts">何ができる：S3を読む</text>
    <text x="32" y="88" class="f-ts">（信頼＋許可ポリシー）</text>
    <path d="M95,96 L95,138" class="f-line" marker-end="url(#iam-role-sts-ah)"/>
    <text x="103" y="122" class="f-ts">付ける</text>
  </g>

  <g data-s="2">
    <rect x="300" y="140" width="150" height="60" rx="8" class="f-box"/>
    <text x="375" y="168" text-anchor="middle" class="f-tb">AWS STS</text>
    <text x="375" y="188" text-anchor="middle" class="f-ts">一時的な鍵を発行</text>
    <path d="M170,158 L298,158" class="f-flow" marker-end="url(#iam-role-sts-am)"/>
    <text x="235" y="150" text-anchor="middle" class="f-ts">AssumeRole</text>
    <path d="M300,186 L172,186" class="f-flow" marker-end="url(#iam-role-sts-am)"/>
    <text x="236" y="218" text-anchor="middle" class="f-tm">一時的な認証情報</text>
    <text x="236" y="236" text-anchor="middle" class="f-ts">（期限つき・自動更新）</text>
  </g>

  <g data-s="3">
    <rect x="260" y="270" width="190" height="50" rx="8" class="f-box"/>
    <text x="355" y="300" text-anchor="middle" class="f-tb">Amazon S3</text>
    <path d="M95,202 L95,295 L258,295" class="f-ok" marker-end="url(#iam-role-sts-aok)"/>
    <text x="110" y="286" class="f-ts">一時的な鍵で読む</text>
  </g>

  <g data-s="4">
    <rect x="10" y="350" width="440" height="110" rx="8" class="f-ngz"/>
    <text x="24" y="374" class="f-tng">ダメな例</text>
    <rect x="24" y="386" width="190" height="44" rx="6" class="f-box"/>
    <text x="119" y="413" text-anchor="middle" class="f-t">EC2＋アクセスキー</text>
    <text x="230" y="404" class="f-ts">長期の鍵は期限なし</text>
    <text x="230" y="422" class="f-ts">漏れたら使われ続ける</text>
    <text x="24" y="450" class="f-ts">コードや AMI に鍵を埋め込まない</text>
  </g>
</svg>`,
      steps: [
        { text: "**IAM ロール** を作る。中身は「誰が引き受けられるか（**信頼ポリシー**：EC2）」と「何ができるか（**アクセス許可ポリシー**：S3 を読む）」の 2 つ。これを **インスタンスプロファイル** 経由で EC2 に付ける。" },
        { text: "EC2 がロールを引き受け（AssumeRole）、**AWS STS** が **一時的な認証情報**（有効期限つきの鍵）を発行する。アプリはそれを **インスタンスメタデータ** から受け取る（SDK が自動で取得）。期限が近づくと自動で新しい鍵に入れ替わる。" },
        { text: "アプリはその一時的な鍵で **S3 を読む**。サーバーには長期の鍵がどこにも置かれていない。" },
        { text: "ダメな例は、IAM ユーザーの **アクセスキー（長期の鍵）をサーバーやコードに置く** こと。期限が無いので、漏れたらずっと悪用される。**つまり**、EC2・Lambda などには **ロールを付けて一時的な認証情報を使う** のが正解。" }
      ]
    },

    // 10. Organizations・SCP
    {
      id: "org-scp",
      lessons: [],
      notes: ["Organizations・SCP・IAM Identity Center"],
      title: "SCPは上限。使える権限はSCPとIAMポリシーの重なりだけ",
      svg: `<svg viewBox="0 0 460 580" xmlns="http://www.w3.org/2000/svg">
  ${M("org-scp")}
  <g data-s="1">
    <rect x="10" y="10" width="440" height="180" rx="10" class="f-zone"/>
    <text x="24" y="34" class="f-tb">Organizations</text>
    <rect x="150" y="44" width="160" height="36" rx="6" class="f-box"/>
    <text x="230" y="67" text-anchor="middle" class="f-t">管理アカウント</text>
    <path d="M230,80 L230,104" class="f-line"/>
    <rect x="40" y="104" width="380" height="76" rx="8" class="f-box2"/>
    <text x="52" y="122" class="f-ts">OU（本番）</text>
    <rect x="60" y="130" width="150" height="36" rx="6" class="f-box"/>
    <text x="135" y="153" text-anchor="middle" class="f-t">アカウント A</text>
    <rect x="250" y="130" width="150" height="36" rx="6" class="f-box"/>
    <text x="325" y="153" text-anchor="middle" class="f-t">アカウント B</text>
  </g>

  <g data-s="2">
    <path d="M230,180 L230,200" class="f-line"/>
    <rect x="40" y="200" width="380" height="40" rx="8" class="f-priv"/>
    <text x="230" y="225" text-anchor="middle" class="f-t">SCP（例：東京以外は禁止）</text>
  </g>

  <g data-s="3">
    <path d="M230,292.5 A95,95 0 0,1 230,447.5 A95,95 0 0,1 230,292.5 Z" class="f-pub"/>
    <circle cx="175" cy="370" r="95" class="f-zone"/>
    <circle cx="285" cy="370" r="95" class="f-zone"/>
    <text x="120" y="362" text-anchor="middle" class="f-tb">SCP</text>
    <text x="120" y="382" text-anchor="middle" class="f-ts">上限</text>
    <text x="328" y="362" text-anchor="middle" class="f-tb">IAMポリシー</text>
    <text x="328" y="382" text-anchor="middle" class="f-ts">許可</text>
    <text x="230" y="364" text-anchor="middle" class="f-tok">使える</text>
    <text x="230" y="382" text-anchor="middle" class="f-tok">権限</text>
    <text x="230" y="494" text-anchor="middle" class="f-tm">実際の権限＝2つの重なり</text>
  </g>

  <g data-s="4">
    <rect x="10" y="508" width="440" height="62" rx="8" class="f-ngz"/>
    <text x="230" y="533" text-anchor="middle" class="f-tng">SCP だけでは何も許可されない</text>
    <text x="230" y="555" text-anchor="middle" class="f-ts">IAM 側にも Allow が必要</text>
  </g>
</svg>`,
      steps: [
        { text: "**AWS Organizations** で複数のアカウントをまとめ、**OU（組織単位）** で階層に分けて管理する。一番上が **管理アカウント**。" },
        { text: "OU やアカウントに **SCP（サービスコントロールポリシー）** を付ける。「東京リージョン以外は禁止」のように、そのアカウントで **できることの上限** を決めるガードレール。メンバーアカウントのルートユーザーにも効くが、**管理アカウントには効かない**。" },
        { text: "実際に使える権限は、**SCP の上限** と **IAM ポリシーの許可** の **重なり（共通部分）** だけ。" },
        { text: "SCP で許していても、IAM ポリシーに Allow が無ければ使えない。**つまり**、**SCP は上限を決めるだけで権限を与えない**。権限を与えるのは IAM ポリシー。" }
      ]
    },

    // 11. KMS エンベロープ暗号化
    {
      id: "kms-envelope",
      lessons: [],
      notes: ["KMSと暗号化（保存時・転送時）"],
      title: "大きなデータはデータキーで暗号化し、データキーをKMSキーで守る",
      svg: `<svg viewBox="0 0 460 480" xmlns="http://www.w3.org/2000/svg">
  ${M("kms-envelope")}
  <rect x="20" y="20" width="150" height="56" rx="8" class="f-box"/>
  <text x="95" y="53" text-anchor="middle" class="f-tb">アプリ</text>
  <rect x="300" y="20" width="150" height="120" rx="8" class="f-zone2"/>
  <text x="375" y="44" text-anchor="middle" class="f-tm">AWS KMS</text>

  <g data-s="1">
    <rect x="315" y="56" width="120" height="36" rx="6" class="f-box"/>
    <text x="375" y="79" text-anchor="middle" class="f-t">KMSキー</text>
    <text x="375" y="118" text-anchor="middle" class="f-ts">外に出ない</text>
    <rect x="20" y="96" width="150" height="40" rx="6" class="f-box2"/>
    <text x="95" y="121" text-anchor="middle" class="f-t">データ 1GB</text>
    <path d="M172,116 L298,116" class="f-ng" marker-end="url(#kms-envelope-ang)"/>
    <text x="235" y="108" text-anchor="middle" class="f-tng">直接は送らない</text>
    <text x="235" y="134" text-anchor="middle" class="f-ts">（上限 4KB）</text>
  </g>

  <g data-s="2">
    <path d="M172,36 L298,36" class="f-flow" marker-end="url(#kms-envelope-am)"/>
    <text x="235" y="30" text-anchor="middle" class="f-ts">データキーを依頼</text>
    <path d="M298,64 L172,64" class="f-flow" marker-end="url(#kms-envelope-am)"/>
    <text x="235" y="82" text-anchor="middle" class="f-ts">2つ届く</text>
    <rect x="20" y="160" width="200" height="40" rx="6" class="f-pub"/>
    <text x="120" y="185" text-anchor="middle" class="f-t">データキー（平文）</text>
    <rect x="240" y="160" width="210" height="40" rx="6" class="f-priv"/>
    <text x="345" y="185" text-anchor="middle" class="f-t">データキー（暗号化済）</text>
    <text x="120" y="218" text-anchor="middle" class="f-ts">データを暗号化する鍵</text>
    <text x="340" y="218" text-anchor="middle" class="f-ts">KMSキーで暗号化</text>
  </g>

  <g data-s="3">
    <path d="M120,226 L120,260" class="f-flow" marker-end="url(#kms-envelope-am)"/>
    <text x="130" y="248" class="f-ts">手元で暗号化</text>
    <rect x="20" y="262" width="200" height="44" rx="6" class="f-zone2"/>
    <text x="120" y="289" text-anchor="middle" class="f-tm">暗号化したデータ</text>
    <text x="132" y="330" class="f-ts">平文のキーは使ったら捨てる</text>
  </g>

  <g data-s="4">
    <rect x="10" y="350" width="440" height="110" rx="10" class="f-zone"/>
    <text x="150" y="374" class="f-tb">保存（S3 など）</text>
    <path d="M120,306 L120,386" class="f-flow" marker-end="url(#kms-envelope-am)"/>
    <path d="M420,200 L420,386" class="f-flow" marker-end="url(#kms-envelope-am)"/>
    <rect x="24" y="388" width="200" height="40" rx="6" class="f-box"/>
    <text x="124" y="413" text-anchor="middle" class="f-t">暗号化したデータ</text>
    <rect x="240" y="388" width="190" height="40" rx="6" class="f-priv"/>
    <text x="335" y="413" text-anchor="middle" class="f-t">暗号化済データキー</text>
    <text x="230" y="450" text-anchor="middle" class="f-ts">読むときは暗号化済キーだけ KMS で復号</text>
  </g>
</svg>`,
      steps: [
        { text: "**KMS キー** は KMS の中にあり、**外に取り出せない**。KMS に直接暗号化を頼めるのは小さなデータ（**4KB まで**）だけなので、1GB のデータを KMS に送って暗号化はしない。" },
        { text: "アプリは KMS に **データキー** を発行してもらう（GenerateDataKey）。届くのは 2 つ：そのまま使える **平文のデータキー** と、KMS キーで暗号化した **暗号化済みのデータキー**。" },
        { text: "アプリは **平文のデータキーで手元のデータを暗号化** する。使い終わった平文のキーはメモリから捨てる。" },
        { text: "**暗号化したデータ** と **暗号化済みのデータキー** をいっしょに保存する。読むときは暗号化済みのデータキーだけを KMS に送って平文に戻し、それでデータを復号する。**つまり**、「データキーでデータを、KMS キーでデータキーを暗号化」＝**エンベロープ暗号化**。大きいデータは KMS に送らない。" }
      ]
    },

    // 12. S3 のアクセス制御
    {
      id: "s3-access",
      lessons: [],
      notes: ["S3のセキュリティ（公開制御・署名付きURL・Object Lock・OAC）"],
      title: "S3は公開せず、CloudFront＋OACか期限つきの署名付きURLで渡す",
      svg: `<svg viewBox="0 0 460 535" xmlns="http://www.w3.org/2000/svg">
  ${M("s3-access")}
  <rect x="20" y="20" width="130" height="44" rx="8" class="f-box2"/>
  <text x="85" y="47" text-anchor="middle" class="f-t">利用者</text>
  <rect x="150" y="250" width="160" height="60" rx="8" class="f-box"/>
  <text x="230" y="276" text-anchor="middle" class="f-tb">S3 バケット</text>
  <text x="230" y="296" text-anchor="middle" class="f-ts">非公開</text>

  <g data-s="1">
    <rect x="150" y="222" width="160" height="26" rx="5" class="f-priv"/>
    <text x="230" y="240" text-anchor="middle" class="f-ts">ブロックパブリックアクセス</text>
    <path d="M85,64 L85,270 L146,270" class="f-ng" marker-end="url(#s3-access-ang)"/>
    <text x="93" y="170" class="f-tng">直接は読めない</text>
  </g>

  <g data-s="2">
    <rect x="250" y="20" width="190" height="44" rx="8" class="f-zone2"/>
    <text x="345" y="47" text-anchor="middle" class="f-tm">CloudFront</text>
    <path d="M150,42 L248,42" class="f-flow" marker-end="url(#s3-access-am)"/>
    <text x="199" y="34" text-anchor="middle" class="f-ts">HTTPS</text>
    <path d="M345,66 C345,150 290,160 290,220" class="f-ok" marker-end="url(#s3-access-aok)"/>
    <text x="352" y="130" class="f-tok">OAC で署名</text>
    <rect x="320" y="262" width="130" height="44" rx="6" class="f-box"/>
    <text x="385" y="280" text-anchor="middle" class="f-ts">バケットポリシー</text>
    <text x="385" y="297" text-anchor="middle" class="f-ts">この CF だけ許可</text>
  </g>

  <g data-s="3">
    <rect x="20" y="370" width="150" height="44" rx="8" class="f-box"/>
    <text x="95" y="397" text-anchor="middle" class="f-t">アプリ</text>
    <rect x="300" y="370" width="150" height="44" rx="8" class="f-box2"/>
    <text x="375" y="397" text-anchor="middle" class="f-t">取引先</text>
    <path d="M172,392 L298,392" class="f-flow" marker-end="url(#s3-access-am)"/>
    <text x="235" y="384" text-anchor="middle" class="f-ts">署名付きURL</text>
    <text x="235" y="410" text-anchor="middle" class="f-ts">期限：例 1時間</text>
    <path d="M375,368 C375,340 300,340 290,314" class="f-ok" marker-end="url(#s3-access-aok)"/>
    <text x="320" y="346" text-anchor="end" class="f-tok">期限内は読める</text>
  </g>

  <g data-s="4">
    <text x="375" y="440" text-anchor="middle" class="f-tng">期限切れなら拒否</text>
    <rect x="10" y="456" width="440" height="66" rx="8" class="f-zone2"/>
    <text x="230" y="484" text-anchor="middle" class="f-tm">公開せず CF＋OAC か署名付きURL</text>
    <text x="230" y="506" text-anchor="middle" class="f-ts">ブロックパブリックアクセスは ON のまま</text>
  </g>
</svg>`,
      steps: [
        { text: "S3 バケットは **ブロックパブリックアクセス**（新規バケットはデフォルトで有効）で公開を防ぐ。インターネットから **直接は読めない**。" },
        { text: "Web で配りたいときは **CloudFront** を前に置き、**OAC（オリジンアクセスコントロール）** で S3 にアクセスさせる。バケットポリシーで **その CloudFront ディストリビューションだけ許可** すれば、S3 への直接アクセスは防げる（旧方式の OAI より OAC が推奨）。" },
        { text: "AWS アカウントを持たない相手に 1 つのファイルを渡したいときは、権限を持つアプリが **署名付き URL** を発行する。相手はその URL で **期限内だけ** 直接 GET（または PUT）できる。" },
        { text: "期限を過ぎた URL は拒否される。**つまり**、S3 は公開しないまま、**配信は CloudFront＋OAC**、**一時的な受け渡しは署名付き URL**。" }
      ]
    },

    // 13. Cognito
    {
      id: "cognito",
      lessons: [],
      notes: ["Amazon Cognito（ユーザープール / IDプール）"],
      title: "ユーザープールでログイン、IDプールでAWSの一時的な鍵に交換",
      svg: `<svg viewBox="0 0 460 500" xmlns="http://www.w3.org/2000/svg">
  ${M("cognito")}
  <rect x="20" y="20" width="130" height="380" rx="10" class="f-box2"/>
  <text x="85" y="200" text-anchor="middle" class="f-ts">利用者の</text>
  <text x="85" y="222" text-anchor="middle" class="f-tb">スマホアプリ</text>

  <g data-s="1">
    <rect x="290" y="20" width="160" height="70" rx="8" class="f-zone2"/>
    <text x="370" y="48" text-anchor="middle" class="f-tm">ユーザープール</text>
    <text x="370" y="70" text-anchor="middle" class="f-ts">ログイン担当</text>
    <path d="M150,40 L288,40" class="f-flow" marker-end="url(#cognito-am)"/>
    <text x="219" y="32" text-anchor="middle" class="f-ts">ID・パスワード</text>
  </g>

  <g data-s="2">
    <path d="M290,74 L152,74" class="f-flow" marker-end="url(#cognito-am)"/>
    <text x="219" y="94" text-anchor="middle" class="f-tm">JWTトークン</text>
  </g>

  <g data-s="3">
    <rect x="290" y="180" width="160" height="70" rx="8" class="f-zone2"/>
    <text x="370" y="208" text-anchor="middle" class="f-tm">IDプール</text>
    <text x="370" y="230" text-anchor="middle" class="f-ts">AWSの鍵に交換</text>
    <path d="M150,200 L288,200" class="f-flow" marker-end="url(#cognito-am)"/>
    <text x="219" y="192" text-anchor="middle" class="f-ts">トークンを渡す</text>
    <path d="M290,234 L152,234" class="f-flow" marker-end="url(#cognito-am)"/>
    <text x="219" y="254" text-anchor="middle" class="f-tm">一時的な認証情報</text>
    <text x="370" y="270" text-anchor="middle" class="f-ts">（中で STS を使う）</text>
  </g>

  <g data-s="4">
    <rect x="290" y="330" width="160" height="56" rx="8" class="f-box"/>
    <text x="370" y="363" text-anchor="middle" class="f-tb">Amazon S3</text>
    <path d="M150,358 L288,358" class="f-ok" marker-end="url(#cognito-aok)"/>
    <text x="219" y="350" text-anchor="middle" class="f-ts">直接アップロード</text>
    <text x="219" y="376" text-anchor="middle" class="f-ts">自分のフォルダだけ</text>
    <rect x="10" y="420" width="440" height="66" rx="8" class="f-zone"/>
    <text x="24" y="446" class="f-t">ユーザープール＝ログイン（認証）</text>
    <text x="24" y="472" class="f-t">IDプール＝AWS の権限（認可）</text>
  </g>
</svg>`,
      steps: [
        { text: "アプリの利用者は **ユーザープール** にサインイン（ID・パスワード、ソーシャルログイン、MFA など）。ユーザープールは **ログイン（認証）担当**。" },
        { text: "ログインに成功すると、ユーザープールが **JWT トークン**（ログイン済みの証明書）を返す。API Gateway や ALB の認証にも使える。" },
        { text: "アプリはトークンを **ID プール** に渡し、S3 などを直接使える **一時的な AWS 認証情報** に交換してもらう（中では STS が期限つきの鍵を発行）。" },
        { text: "アプリはその鍵で **S3 の自分用のフォルダ（プレフィックス）に直接アップロード** する。**つまり**、**ユーザープール＝認証（ログイン）**、**ID プール＝AWS リソースへの一時的な権限（認可）**。何百万人もの利用者に IAM ユーザーを作るのは誤り。" }
      ]
    }
  );
})();
