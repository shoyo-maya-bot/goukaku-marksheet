// SAA の図解（担当 C）。仕様は /home/claude/site/FIG_SCHEMA.md
window.FIGS = window.FIGS || {};
window.FIGS.saa = window.FIGS.saa || [];
window.FIGS.saa.push(
{
  id: "storage-types",
  lessons: [7],
  notes: ["ブロック/ファイルストレージ比較（EBS / Instance Store / EFS / FSx）"],
  title: "1台に付けるEBS、みんなで使うEFS、APIで出し入れするS3",
  svg: `<svg viewBox="0 0 460 560" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="storage-types-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="storage-types-ang" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahng"/></marker>
  </defs>
  <rect x="10" y="10" width="215" height="262" rx="10" class="f-zone"/>
  <text x="24" y="34" class="f-tb">AZ a</text>
  <rect x="235" y="10" width="215" height="262" rx="10" class="f-zone"/>
  <text x="249" y="34" class="f-tb">AZ b</text>
  <rect x="24" y="46" width="186" height="96" rx="6" class="f-box"/>
  <text x="117" y="68" text-anchor="middle" class="f-tb">EC2</text>
  <rect x="250" y="46" width="186" height="46" rx="6" class="f-box"/>
  <text x="343" y="74" text-anchor="middle" class="f-tb">EC2</text>

  <g data-s="1">
    <rect x="56" y="190" width="120" height="42" rx="6" class="f-zone2"/>
    <text x="116" y="216" text-anchor="middle" class="f-tm">EBS</text>
    <path d="M116,142 L116,190" class="f-flow" marker-end="url(#storage-types-am)"/>
    <text x="124" y="172" class="f-ts">1台に付ける</text>
    <text x="116" y="252" text-anchor="middle" class="f-ts">止めてもデータは残る</text>
    <path d="M176,204 L292,96" class="f-ng" marker-end="url(#storage-types-ang)"/>
    <text x="330" y="214" text-anchor="middle" class="f-tng">他のAZは不可</text>
  </g>

  <g data-s="2">
    <rect x="34" y="80" width="166" height="54" rx="5" class="f-ngz"/>
    <text x="117" y="102" text-anchor="middle" class="f-t">インスタンスストア</text>
    <text x="117" y="124" text-anchor="middle" class="f-tng">止めると消える</text>
  </g>

  <g data-s="3">
    <rect x="24" y="300" width="412" height="54" rx="8" class="f-zone2"/>
    <text x="230" y="322" text-anchor="middle" class="f-tm">EFS（共有フォルダ）</text>
    <text x="230" y="342" text-anchor="middle" class="f-ts">複数AZのEC2から同時に使える</text>
    <path d="M36,142 L36,300" class="f-flow" marker-end="url(#storage-types-am)"/>
    <path d="M410,92 L410,300" class="f-flow" marker-end="url(#storage-types-am)"/>
    <text x="416" y="150" class="f-ts">NFS</text>
    <text x="42" y="286" class="f-ts">NFS</text>
  </g>

  <g data-s="4">
    <rect x="24" y="394" width="110" height="44" rx="6" class="f-box"/>
    <text x="79" y="421" text-anchor="middle" class="f-t">アプリ</text>
    <rect x="250" y="390" width="186" height="52" rx="6" class="f-zone2"/>
    <text x="343" y="412" text-anchor="middle" class="f-tm">S3（オブジェクト）</text>
    <text x="343" y="431" text-anchor="middle" class="f-ts">容量はほぼ無制限</text>
    <path d="M134,416 L250,416" class="f-flow" marker-end="url(#storage-types-am)" marker-start="url(#storage-types-am)"/>
    <text x="192" y="406" text-anchor="middle" class="f-ts">API で出し入れ</text>
    <text x="192" y="434" text-anchor="middle" class="f-ts">（HTTPS）</text>
  </g>

  <g data-s="5">
    <text x="230" y="482" text-anchor="middle" class="f-tm">1台のディスク → EBS（同じAZ）</text>
    <text x="230" y="506" text-anchor="middle" class="f-tm">みんなで共有 → EFS（複数AZ）</text>
    <text x="230" y="530" text-anchor="middle" class="f-tm">大量のファイル置き場 → S3</text>
  </g>
</svg>`,
  steps: [
    { text: "**EBS** は EC2 に付ける1台用のディスク。EBS は1つの AZ に属するので、**同じ AZ の EC2 にしか付かない**。EC2 を止めてもデータは残る。" },
    { text: "**インスタンスストア** は EC2 が乗っている物理サーバーに直接付いたディスク。とても速いが、**停止・終了・故障でデータが消える**（再起動では残る）。キャッシュや一時ファイル用。" },
    { text: "**EFS** は共有フォルダ（NFS）。**複数の AZ の EC2 から同時に**マウントして使え、容量も自動で増える。Windows の共有フォルダ（SMB）が要るなら FSx for Windows File Server。" },
    { text: "**S3** はディスクではなく、ネット越しに **API（HTTPS）で出し入れするオブジェクト置き場**。サーバーに付けずに、どこからでも読み書きでき、容量もほぼ無制限。" },
    { text: "つまり「1台のEC2のディスク → **EBS**」「複数台・複数AZで共有 → **EFS**」「大量データ・静的ファイル・バックアップ → **S3**」「消えてよい高速な一時領域 → **インスタンスストア**」。" }
  ]
},
{
  id: "s3-lifecycle",
  lessons: [12],
  notes: ["S3ストレージクラスとライフサイクル"],
  title: "古くなったデータほど、安い倉庫へ自動で移す",
  svg: `<svg viewBox="0 0 460 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="s3-lifecycle-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
  </defs>
  <text x="26" y="44" class="f-ts">ストレージクラス</text>
  <text x="312" y="44" class="f-ts">取り出し / 保管料</text>

  <g data-s="1">
    <rect x="20" y="54" width="280" height="50" rx="6" class="f-box"/>
    <text x="34" y="75" class="f-tb">S3 Standard</text>
    <text x="34" y="94" class="f-ts">作成した直後・よく使う</text>
    <text x="312" y="75" class="f-t">すぐ（ミリ秒）</text>
    <text x="312" y="94" class="f-ts">保管料：高い</text>
  </g>

  <g data-s="2">
    <path d="M90,104 L90,138" class="f-flow" marker-end="url(#s3-lifecycle-am)"/>
    <text x="102" y="126" class="f-tm">30日後に自動で移す</text>
    <rect x="20" y="138" width="280" height="50" rx="6" class="f-box"/>
    <text x="34" y="159" class="f-tb">S3 Standard-IA</text>
    <text x="34" y="178" class="f-ts">最低保存 30日</text>
    <text x="312" y="159" class="f-t">すぐ</text>
    <text x="312" y="178" class="f-ts">安い＋取り出し料</text>
  </g>

  <g data-s="3">
    <path d="M90,188 L90,222" class="f-flow" marker-end="url(#s3-lifecycle-am)"/>
    <text x="102" y="210" class="f-tm">90日後</text>
    <rect x="20" y="222" width="280" height="50" rx="6" class="f-box2"/>
    <text x="34" y="243" class="f-tb">Glacier Flexible Retrieval</text>
    <text x="34" y="262" class="f-ts">最低保存 90日</text>
    <text x="312" y="243" class="f-t">1分〜12時間</text>
    <text x="312" y="262" class="f-ts">もっと安い</text>
  </g>

  <g data-s="4">
    <path d="M90,272 L90,306" class="f-flow" marker-end="url(#s3-lifecycle-am)"/>
    <text x="102" y="294" class="f-tm">365日後</text>
    <rect x="20" y="306" width="280" height="50" rx="6" class="f-box2"/>
    <text x="34" y="327" class="f-tb">Glacier Deep Archive</text>
    <text x="34" y="346" class="f-ts">最低保存 180日</text>
    <text x="312" y="327" class="f-t">12〜48時間</text>
    <text x="312" y="346" class="f-tok">最安</text>
    <text x="230" y="382" text-anchor="middle" class="f-tm">下ほど 保管は安く、取り出しは遅い</text>
  </g>

  <g data-s="5">
    <rect x="20" y="402" width="420" height="80" rx="8" class="f-zone2"/>
    <text x="230" y="424" text-anchor="middle" class="f-ts">使い方が読めないときは</text>
    <text x="230" y="446" text-anchor="middle" class="f-tm">S3 Intelligent-Tiering</text>
    <text x="230" y="468" text-anchor="middle" class="f-ts">自動で階層を移す・取り出し料なし</text>
  </g>
</svg>`,
  steps: [
    { text: "作ったばかりでよく使うデータは **S3 Standard** に置く。ミリ秒ですぐ取り出せるが、保管料はいちばん高い。" },
    { text: "**ライフサイクルルール**で「30日たったら **Standard-IA** へ」と書いておくと自動で移る。IA はたまにしか使わない用で、保管は安いが**取り出し料**がかかり、**最低30日**分の料金がかかる。" },
    { text: "90日たったら **Glacier Flexible Retrieval** へ。保管はもっと安いが、取り出しに**数分〜12時間**（迅速1〜5分／標準3〜5時間／大容量5〜12時間）かかる。最低保存は90日。" },
    { text: "何年も残すだけのデータは **Glacier Deep Archive**。保管料は**最安**だが、取り出しに**12〜48時間**（標準12時間以内／大容量48時間以内）。最低保存は180日。下へ行くほど安く、遅くなる。" },
    { text: "いつ使われるか読めないデータは **Intelligent-Tiering** に入れれば、AWS が使われ方を見て自動で移してくれる（取り出し料なし、少額の監視料あり）。つまり「**パターンが分かる → ライフサイクル**」「**分からない → Intelligent-Tiering**」。" }
  ]
},
{
  id: "cdn-ga",
  lessons: [10],
  notes: ["CloudFront と Global Accelerator"],
  title: "CloudFrontは近くで返す、Global Acceleratorは速い道で運ぶ",
  svg: `<svg viewBox="0 0 460 560" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="cdn-ga-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="cdn-ga-aok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahok"/></marker>
  </defs>
  <rect x="46" y="44" width="140" height="36" rx="18" class="f-box2"/>
  <text x="116" y="67" text-anchor="middle" class="f-t">ユーザー</text>
  <rect x="274" y="44" width="140" height="36" rx="18" class="f-box2"/>
  <text x="344" y="67" text-anchor="middle" class="f-t">ユーザー</text>

  <g data-s="1">
    <text x="116" y="28" text-anchor="middle" class="f-tb">CloudFront</text>
    <rect x="26" y="130" width="180" height="64" rx="8" class="f-zone2"/>
    <text x="116" y="156" text-anchor="middle" class="f-tm">エッジロケーション</text>
    <text x="116" y="180" text-anchor="middle" class="f-tok">キャッシュあり</text>
    <path d="M116,80 L116,130" class="f-flow" marker-end="url(#cdn-ga-am)" marker-start="url(#cdn-ga-am)"/>
    <text x="124" y="110" class="f-ts">HTTP(S)</text>
    <text x="108" y="110" text-anchor="end" class="f-tok">すぐ返す</text>
  </g>

  <g data-s="2">
    <rect x="16" y="276" width="200" height="96" rx="10" class="f-zone"/>
    <text x="26" y="293" class="f-ts">リージョン</text>
    <rect x="26" y="302" width="180" height="56" rx="6" class="f-box"/>
    <text x="116" y="326" text-anchor="middle" class="f-tb">オリジン</text>
    <text x="116" y="345" text-anchor="middle" class="f-ts">S3 / ALB など</text>
    <path d="M116,194 L116,302" class="f-line" marker-end="url(#cdn-ga-am)"/>
    <text x="124" y="236" class="f-ts">無いときだけ</text>
    <text x="124" y="252" class="f-ts">取りに行く</text>
  </g>

  <g data-s="3">
    <text x="344" y="28" text-anchor="middle" class="f-tb">Global Accelerator</text>
    <rect x="254" y="130" width="172" height="70" rx="8" class="f-zone2"/>
    <text x="340" y="150" text-anchor="middle" class="f-tm">入口：固定IP×2</text>
    <text x="340" y="168" text-anchor="middle" class="f-ts">Anycast（近い入口）</text>
    <text x="340" y="188" text-anchor="middle" class="f-tng">キャッシュなし</text>
    <path d="M344,80 L344,130" class="f-flow" marker-end="url(#cdn-ga-am)"/>
    <text x="352" y="110" class="f-ts">TCP / UDP</text>
    <rect x="244" y="276" width="196" height="96" rx="10" class="f-zone"/>
    <text x="254" y="293" class="f-ts">リージョン A</text>
    <rect x="254" y="302" width="172" height="56" rx="6" class="f-box"/>
    <text x="340" y="326" text-anchor="middle" class="f-tb">ALB / NLB / EC2</text>
    <text x="340" y="345" text-anchor="middle" class="f-ts">毎回ここまで届く</text>
    <path d="M340,200 L340,302" class="f-flow" marker-end="url(#cdn-ga-am)"/>
    <text x="348" y="240" class="f-ts">AWS の回線</text>
    <text x="348" y="256" class="f-ts">で運ぶ</text>
  </g>

  <g data-s="4">
    <rect x="254" y="302" width="172" height="56" rx="6" class="f-ngz"/>
    <text x="340" y="336" text-anchor="middle" class="f-tng">障害！</text>
    <rect x="244" y="392" width="196" height="84" rx="10" class="f-zone"/>
    <text x="254" y="409" class="f-ts">リージョン B</text>
    <rect x="254" y="416" width="172" height="50" rx="6" class="f-box"/>
    <text x="340" y="437" text-anchor="middle" class="f-tb">ALB（予備）</text>
    <text x="340" y="456" text-anchor="middle" class="f-tok">すぐ自動で切替</text>
    <path d="M426,190 C454,240 454,400 426,436" class="f-ok" marker-end="url(#cdn-ga-aok)"/>
  </g>

  <g data-s="5">
    <text x="230" y="510" text-anchor="middle" class="f-tm">キャッシュして配る → CloudFront</text>
    <text x="230" y="534" text-anchor="middle" class="f-tm">固定IP・UDP・ゲーム → Global Accelerator</text>
  </g>
</svg>`,
  steps: [
    { text: "**CloudFront** はユーザーの近くの**エッジロケーション**にコンテンツを**キャッシュ（コピー）**しておき、そこから返す。HTTP(S) の静的・動的コンテンツが対象。" },
    { text: "エッジに無いときだけ、遠くの**オリジン**（S3 や ALB）へ取りに行く。2回目からはエッジが答えるので速く、オリジンの負荷と転送量も減る。" },
    { text: "**Global Accelerator** は**キャッシュしない**。代わりに **固定の Anycast IP を2つ**くれて、ユーザーは近くの入口から入り、そこから先は **AWS の回線**でリージョンの ALB / NLB / EC2 まで運ばれる。HTTP 以外の **TCP/UDP**（ゲーム・IoT・VoIP）もOK。" },
    { text: "リージョン A が落ちたら、ヘルスチェックで**すぐリージョン B へ切り替わる**。IP は変わらないので、DNS のキャッシュを待たずに済む。" },
    { text: "つまり「**キャッシュ・動画・静的コンテンツ** → CloudFront」「**固定IP・UDP・ゲーム・速いフェイルオーバー** → Global Accelerator」。" }
  ]
},
{
  id: "cache-aside",
  lessons: [8],
  notes: ["ElastiCache とキャッシュ戦略"],
  title: "まずキャッシュを見て、無いときだけDBへ（遅延読み込み）",
  svg: `<svg viewBox="0 0 460 470" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="cache-aside-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="cache-aside-aok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahok"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="340" rx="8" class="f-box"/>
  <text x="80" y="206" text-anchor="middle" class="f-tb">アプリ</text>
  <text x="80" y="226" text-anchor="middle" class="f-ts">（EC2 など）</text>
  <rect x="300" y="40" width="140" height="130" rx="8" class="f-zone2"/>
  <text x="370" y="64" text-anchor="middle" class="f-tm">ElastiCache</text>
  <text x="370" y="84" text-anchor="middle" class="f-ts">メモリ・とても速い</text>
  <rect x="300" y="250" width="140" height="130" rx="8" class="f-box2"/>
  <text x="370" y="274" text-anchor="middle" class="f-tb">データベース</text>
  <text x="370" y="294" text-anchor="middle" class="f-ts">RDS など・遅め</text>

  <g data-s="1">
    <path d="M140,104 L300,104" class="f-flow" marker-end="url(#cache-aside-am)"/>
    <text x="220" y="96" text-anchor="middle" class="f-tm">① まず探す</text>
  </g>

  <g data-s="2">
    <path d="M300,136 L140,136" class="f-ok" marker-end="url(#cache-aside-aok)"/>
    <text x="220" y="128" text-anchor="middle" class="f-tok">② ヒット→すぐ返る</text>
  </g>

  <g data-s="3">
    <text x="370" y="158" text-anchor="middle" class="f-tng">ミス（無い）</text>
    <path d="M140,316 L300,316" class="f-flow" marker-end="url(#cache-aside-am)"/>
    <text x="220" y="308" text-anchor="middle" class="f-tm">③ DB から読む</text>
    <path d="M300,350 L140,350" class="f-line" marker-end="url(#cache-aside-am)"/>
    <text x="220" y="342" text-anchor="middle" class="f-ts">データ</text>
  </g>

  <g data-s="4">
    <path d="M140,210 C220,210 250,170 300,166" class="f-flow" marker-end="url(#cache-aside-am)"/>
    <text x="214" y="232" text-anchor="middle" class="f-tm">④ キャッシュに書く</text>
    <text x="214" y="250" text-anchor="middle" class="f-ts">TTL（有効期限）付き</text>
  </g>

  <g data-s="5">
    <text x="230" y="414" text-anchor="middle" class="f-tm">次からはヒット → DB の読み取りが減る</text>
    <text x="230" y="438" text-anchor="middle" class="f-ts">古いデータが残りうる → TTL で入れ替える</text>
  </g>
</svg>`,
  steps: [
    { text: "アプリはデータが欲しいとき、DB より先に **ElastiCache**（メモリ上のキャッシュ）を探す。" },
    { text: "キャッシュにあれば（**ヒット**）、そのまますぐ返る。DB には行かないので速い。" },
    { text: "キャッシュに無ければ（**ミス**）、アプリが **DB から読む**。ここは遅めで、DB にも負荷がかかる。" },
    { text: "読んだデータを、アプリが**キャッシュに書いておく**。必要になったときに初めて入れるので **遅延読み込み（Lazy Loading / Cache-Aside）** という。TTL（有効期限）を付けて古いデータを入れ替える。" },
    { text: "次からはキャッシュがヒットし、**DB への読み取りが減って速くなる**。つまり「**読み取りが多い・DB の負荷を下げたい** → ElastiCache を DB の前に置く」。いつも最新にしたいなら書き込み時にキャッシュも更新する**ライトスルー**。" }
  ]
},
{
  id: "dynamodb",
  lessons: [],
  notes: ["DynamoDB（キャパシティモード・DAX・グローバルテーブル）"],
  title: "DAXで読み取りをマイクロ秒に、グローバルテーブルで世界中で読み書き",
  svg: `<svg viewBox="0 0 460 580" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="dynamodb-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="dynamodb-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ah"/></marker>
  </defs>
  <rect x="10" y="10" width="440" height="230" rx="10" class="f-zone"/>
  <text x="24" y="34" class="f-tb">リージョン A（東京）</text>
  <rect x="30" y="60" width="110" height="50" rx="6" class="f-box"/>
  <text x="85" y="90" text-anchor="middle" class="f-t">アプリ</text>

  <g data-s="1">
    <rect x="320" y="60" width="110" height="50" rx="6" class="f-box2"/>
    <text x="375" y="81" text-anchor="middle" class="f-tb">DynamoDB</text>
    <text x="375" y="99" text-anchor="middle" class="f-ts">テーブル</text>
    <path d="M85,110 C85,160 375,160 375,110" class="f-line" marker-end="url(#dynamodb-ah)" marker-start="url(#dynamodb-ah)"/>
    <text x="230" y="174" text-anchor="middle" class="f-ts">ふつうでも1桁ミリ秒</text>
  </g>

  <g data-s="2">
    <rect x="175" y="60" width="110" height="50" rx="6" class="f-zone2"/>
    <text x="230" y="81" text-anchor="middle" class="f-tm">DAX</text>
    <text x="230" y="99" text-anchor="middle" class="f-ts">キャッシュ</text>
    <path d="M140,85 L175,85" class="f-flow" marker-end="url(#dynamodb-am)"/>
    <path d="M285,85 L320,85" class="f-flow" marker-end="url(#dynamodb-am)"/>
    <text x="230" y="52" text-anchor="middle" class="f-tm">読み取りはマイクロ秒</text>
    <text x="230" y="214" text-anchor="middle" class="f-ts">※書き込みは速くならない</text>
  </g>

  <g data-s="3">
    <rect x="10" y="310" width="440" height="200" rx="10" class="f-zone"/>
    <text x="24" y="334" class="f-tb">リージョン B（米国）</text>
    <rect x="320" y="360" width="110" height="50" rx="6" class="f-box2"/>
    <text x="375" y="381" text-anchor="middle" class="f-tb">DynamoDB</text>
    <text x="375" y="399" text-anchor="middle" class="f-ts">テーブル</text>
    <path d="M375,110 L375,360" class="f-flow" marker-end="url(#dynamodb-am)" marker-start="url(#dynamodb-am)"/>
    <text x="365" y="268" text-anchor="end" class="f-tm">双方向に自動コピー</text>
    <text x="365" y="288" text-anchor="end" class="f-ts">ふつう1秒以内</text>
  </g>

  <g data-s="4">
    <rect x="30" y="360" width="110" height="50" rx="6" class="f-box"/>
    <text x="85" y="390" text-anchor="middle" class="f-t">アプリ</text>
    <path d="M140,385 L320,385" class="f-flow" marker-end="url(#dynamodb-am)" marker-start="url(#dynamodb-am)"/>
    <text x="230" y="377" text-anchor="middle" class="f-tm">近くで読み書き</text>
    <text x="230" y="460" text-anchor="middle" class="f-tok">どちらのリージョンでも書ける</text>
    <text x="230" y="482" text-anchor="middle" class="f-ts">（マルチアクティブ）</text>
  </g>

  <g data-s="5">
    <text x="230" y="540" text-anchor="middle" class="f-tm">読み取りを速く → DAX</text>
    <text x="230" y="564" text-anchor="middle" class="f-tm">世界中で読み書き・DR → グローバルテーブル</text>
  </g>
</svg>`,
  steps: [
    { text: "**DynamoDB** はサーバー管理のいらないキーバリュー型 DB。ふつうに使っても応答は **1桁ミリ秒**と速い。" },
    { text: "テーブルの前に **DAX**（DynamoDB 専用のメモリキャッシュ）を置くと、読み取りが **マイクロ秒** になる。DynamoDB と同じ API なのでコードの変更は少ない。ただし**書き込みは速くならない**。" },
    { text: "**グローバルテーブル** にすると、別のリージョンにも同じテーブルができ、変更が**双方向に自動でコピー**される。" },
    { text: "どちらのリージョンでも**読み書きできる（マルチアクティブ）**。各地のユーザーは近いリージョンを使えて速く、片方のリージョンが落ちても、もう片方で続けられる。" },
    { text: "つまり「**DynamoDB の読み取りをマイクロ秒に** → DAX」「**複数リージョンで読み書き・リージョン障害に備える** → グローバルテーブル」。RDS などの汎用キャッシュは ElastiCache。" }
  ]
},
{
  id: "analytics-pipeline",
  lessons: [],
  notes: ["分析・データ処理サービス（Athena / Glue / Redshift / Kinesis / EMR ほか）"],
  title: "取り込む→S3に貯める→整える→SQLで分析→グラフで見る",
  svg: `<svg viewBox="0 0 460 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="analytics-pipeline-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
  </defs>
  <rect x="130" y="16" width="200" height="44" rx="22" class="f-box2"/>
  <text x="230" y="43" text-anchor="middle" class="f-t">ログ・IoT・クリック</text>

  <g data-s="1">
    <rect x="20" y="100" width="190" height="56" rx="6" class="f-box"/>
    <text x="115" y="123" text-anchor="middle" class="f-tb">Data Streams</text>
    <text x="115" y="143" text-anchor="middle" class="f-ts">リアルタイム・読み直せる</text>
    <rect x="250" y="100" width="190" height="56" rx="6" class="f-box"/>
    <text x="345" y="123" text-anchor="middle" class="f-tb">Data Firehose</text>
    <text x="345" y="143" text-anchor="middle" class="f-ts">コード不要で配送</text>
    <path d="M180,60 L130,100" class="f-flow" marker-end="url(#analytics-pipeline-am)"/>
    <text x="140" y="80" text-anchor="end" class="f-ts">流し込む</text>
    <path d="M210,128 L250,128" class="f-flow" marker-end="url(#analytics-pipeline-am)"/>
  </g>

  <g data-s="2">
    <rect x="20" y="190" width="420" height="56" rx="8" class="f-zone2"/>
    <text x="230" y="213" text-anchor="middle" class="f-tm">S3（データレイク）</text>
    <text x="230" y="233" text-anchor="middle" class="f-ts">生データを安く、そのまま貯める</text>
    <path d="M400,156 L400,190" class="f-flow" marker-end="url(#analytics-pipeline-am)"/>
    <text x="392" y="178" text-anchor="end" class="f-ts">自動で貯める</text>
  </g>

  <g data-s="3">
    <rect x="240" y="286" width="200" height="56" rx="6" class="f-box"/>
    <text x="340" y="309" text-anchor="middle" class="f-tb">Glue</text>
    <text x="340" y="329" text-anchor="middle" class="f-ts">カタログ化・変換（ETL）</text>
    <path d="M340,246 L340,286" class="f-flow" marker-end="url(#analytics-pipeline-am)" marker-start="url(#analytics-pipeline-am)"/>
    <text x="332" y="271" text-anchor="end" class="f-ts">読んで整える</text>
  </g>

  <g data-s="4">
    <rect x="20" y="380" width="190" height="56" rx="6" class="f-box"/>
    <text x="115" y="403" text-anchor="middle" class="f-tb">Athena</text>
    <text x="115" y="423" text-anchor="middle" class="f-ts">S3 に直接 SQL</text>
    <path d="M90,246 L90,380" class="f-flow" marker-end="url(#analytics-pipeline-am)"/>
    <text x="98" y="300" class="f-ts">そのまま読む</text>
    <text x="98" y="316" class="f-ts">（Glue の表で）</text>
    <rect x="250" y="380" width="190" height="56" rx="6" class="f-box"/>
    <text x="345" y="403" text-anchor="middle" class="f-tb">Redshift</text>
    <text x="345" y="423" text-anchor="middle" class="f-ts">大量データを集計</text>
    <path d="M345,342 L345,380" class="f-flow" marker-end="url(#analytics-pipeline-am)"/>
    <text x="353" y="366" class="f-ts">ロード</text>
  </g>

  <g data-s="5">
    <rect x="110" y="476" width="240" height="56" rx="6" class="f-zone2"/>
    <text x="230" y="499" text-anchor="middle" class="f-tm">QuickSight</text>
    <text x="230" y="519" text-anchor="middle" class="f-ts">Amazon Quick・グラフで見る</text>
    <path d="M115,436 L170,476" class="f-flow" marker-end="url(#analytics-pipeline-am)"/>
    <path d="M345,436 L290,476" class="f-flow" marker-end="url(#analytics-pipeline-am)"/>
    <text x="230" y="566" text-anchor="middle" class="f-tm">サーバー管理なしで SQL → Athena</text>
    <text x="230" y="588" text-anchor="middle" class="f-tm">運用最小で S3 へ流す → Firehose</text>
  </g>
</svg>`,
  steps: [
    { text: "アプリのログや IoT のデータを **Kinesis Data Streams** でリアルタイムに受け取る（複数の読み手が使え、少し前にさかのぼって読み直せる）。**Amazon Data Firehose** はそれを**コードを書かずに**送り届ける係。" },
    { text: "Firehose がデータを **S3** に自動で貯める。これが **データレイク**（なんでも安く、そのまま放り込んでおく湖）。" },
    { text: "**Glue** のクローラーが S3 のデータを読んで「どんな列があるか」を**データカタログ**に登録し、必要なら形を整える（ETL）。" },
    { text: "**Athena** は S3 のデータに**サーバーなしで SQL** を投げられる（Glue のカタログを表として使う。読んだ量で課金なので Parquet＋圧縮＋パーティションで安くなる）。大量データを何度も集計するなら **Redshift**（データウェアハウス）に入れる。" },
    { text: "結果は **QuickSight**（試験ガイドの表記は Amazon Quick）でグラフやダッシュボードにする。つまり「**S3 のログにさっと SQL** → Athena」「**運用最小でストリームを S3 へ** → Firehose」「**大規模な集計・BI** → Redshift」。" }
  ]
},
{
  id: "data-migration",
  lessons: [],
  notes: ["データ移行・ハイブリッドストレージ（Storage Gateway / DataSync / Snow / Transfer Family / DMS）"],
  title: "何を運ぶかで、オンプレからAWSへの道具を選ぶ",
  svg: `<svg viewBox="0 0 460 510" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="data-migration-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="data-migration-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ah"/></marker>
  </defs>
  <text x="80" y="26" text-anchor="middle" class="f-tb">オンプレミス</text>
  <text x="380" y="26" text-anchor="middle" class="f-tb">AWS</text>
  <rect x="10" y="38" width="140" height="420" rx="10" class="f-zone"/>
  <rect x="310" y="38" width="140" height="420" rx="10" class="f-zone"/>

  <g data-s="1">
    <rect x="20" y="50" width="120" height="56" rx="6" class="f-box"/>
    <text x="80" y="73" text-anchor="middle" class="f-tb">NAS</text>
    <text x="80" y="93" text-anchor="middle" class="f-ts">ファイル一式</text>
    <rect x="165" y="50" width="130" height="56" rx="6" class="f-zone2"/>
    <text x="230" y="73" text-anchor="middle" class="f-tm">DataSync</text>
    <text x="230" y="93" text-anchor="middle" class="f-ts">一括・定期コピー</text>
    <rect x="320" y="50" width="120" height="56" rx="6" class="f-box"/>
    <text x="380" y="73" text-anchor="middle" class="f-tb">S3/EFS/FSx</text>
    <text x="380" y="93" text-anchor="middle" class="f-ts">移行先</text>
    <path d="M140,78 L165,78" class="f-flow" marker-end="url(#data-migration-am)"/>
    <path d="M295,78 L320,78" class="f-flow" marker-end="url(#data-migration-am)"/>
  </g>

  <g data-s="2">
    <rect x="20" y="136" width="120" height="56" rx="6" class="f-box"/>
    <text x="80" y="159" text-anchor="middle" class="f-tb">社内アプリ</text>
    <text x="80" y="179" text-anchor="middle" class="f-ts">使い続ける</text>
    <rect x="165" y="136" width="130" height="56" rx="6" class="f-zone2"/>
    <text x="230" y="159" text-anchor="middle" class="f-tm">Storage Gateway</text>
    <text x="230" y="179" text-anchor="middle" class="f-ts">NFS/SMBでつなぐ</text>
    <rect x="320" y="136" width="120" height="56" rx="6" class="f-box"/>
    <text x="380" y="159" text-anchor="middle" class="f-tb">S3</text>
    <text x="380" y="179" text-anchor="middle" class="f-ts">本体は AWS 側</text>
    <path d="M140,164 L165,164" class="f-flow" marker-end="url(#data-migration-am)" marker-start="url(#data-migration-am)"/>
    <path d="M295,164 L320,164" class="f-flow" marker-end="url(#data-migration-am)" marker-start="url(#data-migration-am)"/>
  </g>

  <g data-s="3">
    <rect x="20" y="222" width="120" height="56" rx="6" class="f-box"/>
    <text x="80" y="245" text-anchor="middle" class="f-tb">取引先</text>
    <text x="80" y="265" text-anchor="middle" class="f-ts">SFTP で送る</text>
    <rect x="165" y="222" width="130" height="56" rx="6" class="f-zone2"/>
    <text x="230" y="245" text-anchor="middle" class="f-tm">Transfer Family</text>
    <text x="230" y="265" text-anchor="middle" class="f-ts">SFTP の受け口</text>
    <rect x="320" y="222" width="120" height="56" rx="6" class="f-box"/>
    <text x="380" y="245" text-anchor="middle" class="f-tb">S3 / EFS</text>
    <text x="380" y="265" text-anchor="middle" class="f-ts">保存先</text>
    <path d="M140,250 L165,250" class="f-flow" marker-end="url(#data-migration-am)"/>
    <path d="M295,250 L320,250" class="f-flow" marker-end="url(#data-migration-am)"/>
  </g>

  <g data-s="4">
    <rect x="20" y="308" width="120" height="56" rx="6" class="f-box"/>
    <text x="80" y="331" text-anchor="middle" class="f-tb">DB</text>
    <text x="80" y="351" text-anchor="middle" class="f-ts">Oracle など</text>
    <rect x="165" y="308" width="130" height="56" rx="6" class="f-zone2"/>
    <text x="230" y="331" text-anchor="middle" class="f-tm">DMS</text>
    <text x="230" y="351" text-anchor="middle" class="f-ts">止めずに移行</text>
    <rect x="320" y="308" width="120" height="56" rx="6" class="f-box"/>
    <text x="380" y="331" text-anchor="middle" class="f-tb">RDS/Aurora</text>
    <text x="380" y="351" text-anchor="middle" class="f-ts">異種DBは変換</text>
    <path d="M140,336 L165,336" class="f-flow" marker-end="url(#data-migration-am)"/>
    <path d="M295,336 L320,336" class="f-flow" marker-end="url(#data-migration-am)"/>
  </g>

  <g data-s="5">
    <rect x="20" y="394" width="120" height="56" rx="6" class="f-box"/>
    <text x="80" y="417" text-anchor="middle" class="f-tb">数百TB</text>
    <text x="80" y="437" text-anchor="middle" class="f-ts">回線が細い</text>
    <rect x="165" y="394" width="130" height="56" rx="6" class="f-box2"/>
    <text x="230" y="417" text-anchor="middle" class="f-tb">Snowball Edge</text>
    <text x="230" y="437" text-anchor="middle" class="f-ts">機器で運ぶ</text>
    <rect x="320" y="394" width="120" height="56" rx="6" class="f-box"/>
    <text x="380" y="417" text-anchor="middle" class="f-tb">S3</text>
    <text x="380" y="437" text-anchor="middle" class="f-ts">取り込み先</text>
    <path d="M140,422 L165,422" class="f-line" marker-end="url(#data-migration-ah)"/>
    <path d="M295,422 L320,422" class="f-line" marker-end="url(#data-migration-ah)"/>
    <text x="230" y="482" text-anchor="middle" class="f-tng">※Snowは試験上の正解</text>
    <text x="230" y="500" text-anchor="middle" class="f-ts">実務では Snowball Edge は新規受付終了</text>
  </g>
</svg>`,
  steps: [
    { text: "オンプレの NAS にあるファイルを AWS へ**ネット越しに一括コピー・定期同期**するなら **DataSync**。S3・EFS・FSx へ、増分だけ速く運んでくれる。" },
    { text: "オンプレのアプリを**使い続けながら** AWS のストレージにつなぐなら **Storage Gateway**。アプリからは NFS/SMB のフォルダに見え、データ本体は S3 に置かれる（よく使う分は手元にキャッシュ）。テープの代わりなら Tape Gateway。" },
    { text: "取引先が **SFTP** で送ってくるファイルを受け取るなら **Transfer Family**。SFTP サーバーを自分で立てずに、S3 や EFS へ直接保存できる。" },
    { text: "**データベース**は **DMS**。動かしたまま移し、移行中の変更も追いかけてコピーするので、止める時間が最小で済む。Oracle → Aurora など種類が違う DB ならスキーマ変換（SCT / DMS Schema Conversion）も使う。" },
    { text: "回線が細くて何週間もかかる大容量は、物理機器で運ぶ **Snowball Edge** が**試験上の正解**。ただし実務では新規受付が終了しているので、DataSync＋Direct Connect などを使う。つまり「**ファイル一括 → DataSync／使いながら → Storage Gateway／SFTP → Transfer Family／DB → DMS**」。" }
  ]
},
{
  id: "purchase-options",
  lessons: [12],
  notes: ["EC2の購入オプション"],
  title: "約束が強いほど安く、中断を許せばもっと安い",
  svg: `<svg viewBox="0 0 460 500" xmlns="http://www.w3.org/2000/svg">
  <g data-s="1">
    <rect x="20" y="20" width="420" height="110" rx="8" class="f-box"/>
    <text x="36" y="46" class="f-tb">オンデマンド</text>
    <text x="36" y="76" class="f-ts">約束</text>
    <rect x="80" y="66" width="24" height="12" rx="2" class="f-box2"/><rect x="108" y="66" width="24" height="12" rx="2" class="f-box2"/><rect x="136" y="66" width="24" height="12" rx="2" class="f-box2"/><rect x="164" y="66" width="24" height="12" rx="2" class="f-box2"/><rect x="192" y="66" width="24" height="12" rx="2" class="f-box2"/>
    <text x="222" y="76" class="f-ts">なし</text>
    <text x="36" y="100" class="f-ts">安さ</text>
    <rect x="80" y="90" width="24" height="12" rx="2" class="f-zone2"/><rect x="108" y="90" width="24" height="12" rx="2" class="f-box2"/><rect x="136" y="90" width="24" height="12" rx="2" class="f-box2"/><rect x="164" y="90" width="24" height="12" rx="2" class="f-box2"/><rect x="192" y="90" width="24" height="12" rx="2" class="f-box2"/>
    <text x="222" y="100" class="f-ts">定価</text>
    <text x="284" y="56" class="f-ts">向く仕事</text>
    <text x="284" y="80" class="f-t">短期・予測できない</text>
    <text x="284" y="102" class="f-t">止められない仕事</text>
  </g>

  <g data-s="2">
    <rect x="20" y="150" width="420" height="120" rx="8" class="f-box"/>
    <text x="36" y="176" class="f-tb">Savings Plans / RI</text>
    <text x="36" y="206" class="f-ts">約束</text>
    <rect x="80" y="196" width="24" height="12" rx="2" class="f-zone2"/><rect x="108" y="196" width="24" height="12" rx="2" class="f-zone2"/><rect x="136" y="196" width="24" height="12" rx="2" class="f-zone2"/><rect x="164" y="196" width="24" height="12" rx="2" class="f-zone2"/><rect x="192" y="196" width="24" height="12" rx="2" class="f-zone2"/>
    <text x="222" y="206" class="f-ts">1年/3年</text>
    <text x="36" y="230" class="f-ts">安さ</text>
    <rect x="80" y="220" width="24" height="12" rx="2" class="f-zone2"/><rect x="108" y="220" width="24" height="12" rx="2" class="f-zone2"/><rect x="136" y="220" width="24" height="12" rx="2" class="f-zone2"/><rect x="164" y="220" width="24" height="12" rx="2" class="f-zone2"/><rect x="192" y="220" width="24" height="12" rx="2" class="f-box2"/>
    <text x="222" y="230" class="f-ts">大幅割引</text>
    <text x="36" y="256" class="f-ts">使わなくても約束分は払う</text>
    <text x="284" y="186" class="f-ts">向く仕事</text>
    <text x="284" y="210" class="f-t">24時間ずっと動く</text>
    <text x="284" y="232" class="f-t">本番の定常利用</text>
  </g>

  <g data-s="3">
    <rect x="20" y="290" width="420" height="120" rx="8" class="f-box"/>
    <text x="36" y="316" class="f-tb">スポット</text>
    <text x="36" y="346" class="f-ts">約束</text>
    <rect x="80" y="336" width="24" height="12" rx="2" class="f-box2"/><rect x="108" y="336" width="24" height="12" rx="2" class="f-box2"/><rect x="136" y="336" width="24" height="12" rx="2" class="f-box2"/><rect x="164" y="336" width="24" height="12" rx="2" class="f-box2"/><rect x="192" y="336" width="24" height="12" rx="2" class="f-box2"/>
    <text x="222" y="346" class="f-ts">なし</text>
    <text x="36" y="370" class="f-ts">安さ</text>
    <rect x="80" y="360" width="24" height="12" rx="2" class="f-zone2"/><rect x="108" y="360" width="24" height="12" rx="2" class="f-zone2"/><rect x="136" y="360" width="24" height="12" rx="2" class="f-zone2"/><rect x="164" y="360" width="24" height="12" rx="2" class="f-zone2"/><rect x="192" y="360" width="24" height="12" rx="2" class="f-zone2"/>
    <text x="222" y="370" class="f-ts">最大9割引</text>
    <text x="36" y="396" class="f-tng">2分前の通知で中断される</text>
    <text x="284" y="326" class="f-ts">向く仕事</text>
    <text x="284" y="350" class="f-t">バッチ・CI・分析</text>
    <text x="284" y="372" class="f-t">止まってもよい仕事</text>
  </g>

  <g data-s="4">
    <text x="230" y="444" text-anchor="middle" class="f-tm">ずっと動く → Savings Plans / RI</text>
    <text x="230" y="466" text-anchor="middle" class="f-tm">止まってよい → スポット</text>
    <text x="230" y="488" text-anchor="middle" class="f-tm">短期・読めない → オンデマンド</text>
  </g>
</svg>`,
  steps: [
    { text: "基準は **オンデマンド**。約束なしで、いつでも始めて止められ、使った分だけ**定価**で払う。" },
    { text: "**Savings Plans / リザーブドインスタンス（RI）** は「**1年か3年、これだけ使います**」と約束する代わりに大きく割り引かれる。ただし使わなくても約束した分は払う。24時間動く本番サーバー向き。" },
    { text: "**スポット** は AWS の余っているサーバーを**最大9割引**で借りる。約束はいらないが、AWS が必要になると **2分前の通知で中断される**。止まってもやり直せるバッチ・CI・分析向き。DB には使わない。" },
    { text: "つまり「**ずっと動く定常利用 → Savings Plans / RI**」「**中断してよい → スポット**」「**短期・予測できない・止められない → オンデマンド**」。組み合わせて、ベースは Savings Plans、増えた分はスポット、が定番。" }
  ]
},
{
  id: "transfer-cost",
  lessons: [],
  notes: ["ネットワーク・データ転送コストの最適化"],
  title: "S3へはNATを通さずゲートウェイ型エンドポイントで無料に",
  svg: `<svg viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="transfer-cost-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="transfer-cost-aok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahok"/></marker>
  </defs>
  <rect x="20" y="14" width="150" height="36" rx="18" class="f-box2"/>
  <text x="95" y="37" text-anchor="middle" class="f-t">インターネット</text>
  <rect x="290" y="14" width="150" height="40" rx="6" class="f-box2"/>
  <text x="365" y="39" text-anchor="middle" class="f-tb">S3</text>
  <rect x="10" y="86" width="440" height="400" rx="10" class="f-zone"/>
  <text x="436" y="108" text-anchor="end" class="f-tb">VPC</text>
  <rect x="24" y="120" width="200" height="96" rx="8" class="f-pub"/>
  <text x="214" y="138" text-anchor="end" class="f-ts">パブリック</text>
  <rect x="24" y="236" width="200" height="104" rx="8" class="f-priv"/>
  <text x="214" y="254" text-anchor="end" class="f-ts">プライベート</text>
  <rect x="34" y="264" width="180" height="40" rx="6" class="f-box"/>
  <text x="124" y="289" text-anchor="middle" class="f-t">EC2（アプリ）</text>

  <g data-s="1">
    <rect x="60" y="72" width="70" height="28" rx="6" class="f-box"/>
    <text x="95" y="91" text-anchor="middle" class="f-tb">IGW</text>
    <line x1="95" y1="50" x2="95" y2="72" class="f-line"/>
    <rect x="34" y="148" width="180" height="40" rx="6" class="f-box"/>
    <text x="124" y="173" text-anchor="middle" class="f-t">NAT ゲートウェイ</text>
    <text x="72" y="208" class="f-tng">時間＋処理料金</text>
    <path d="M60,264 L60,188" class="f-flow" marker-end="url(#transfer-cost-am)"/>
    <path d="M95,148 L95,100" class="f-flow" marker-end="url(#transfer-cost-am)"/>
    <path d="M130,86 C200,86 236,44 290,36" class="f-flow" marker-end="url(#transfer-cost-am)"/>
    <text x="232" y="30" text-anchor="middle" class="f-ts">IGW 経由</text>
  </g>

  <g data-s="2">
    <rect x="262" y="196" width="176" height="52" rx="6" class="f-zone2"/>
    <text x="350" y="216" text-anchor="middle" class="f-tm">Gateway型エンドポイント</text>
    <text x="350" y="238" text-anchor="middle" class="f-tok">料金なし</text>
    <path d="M214,284 C250,284 300,280 320,248" class="f-ok" marker-end="url(#transfer-cost-aok)"/>
    <path d="M350,196 L350,54" class="f-ok" marker-end="url(#transfer-cost-aok)"/>
    <text x="358" y="130" class="f-ts">AWS 内で直接</text>
    <text x="300" y="306" text-anchor="middle" class="f-ts">S3 宛てだけ</text>
  </g>

  <g data-s="3">
    <rect x="24" y="390" width="150" height="44" rx="6" class="f-box"/>
    <text x="99" y="417" text-anchor="middle" class="f-t">EC2（AZ a）</text>
    <rect x="286" y="390" width="150" height="44" rx="6" class="f-box"/>
    <text x="361" y="417" text-anchor="middle" class="f-t">EC2（AZ b）</text>
    <path d="M174,412 L286,412" class="f-flow" marker-end="url(#transfer-cost-am)" marker-start="url(#transfer-cost-am)"/>
    <text x="230" y="402" text-anchor="middle" class="f-ts">AZ をまたぐ</text>
    <text x="230" y="430" text-anchor="middle" class="f-tng">有料</text>
    <text x="230" y="466" text-anchor="middle" class="f-ts">同じ AZ 内（プライベートIP）なら無料</text>
  </g>

  <g data-s="4">
    <path d="M30,516 L110,516" class="f-ok" marker-end="url(#transfer-cost-aok)"/>
    <text x="122" y="521" class="f-tok">ネット → AWS（受信）は無料</text>
    <path d="M30,548 L110,548" class="f-flow" marker-end="url(#transfer-cost-am)"/>
    <text x="122" y="553" class="f-tng">AWS → ネット（送信）は有料</text>
  </g>

  <g data-s="5">
    <text x="230" y="596" text-anchor="middle" class="f-tm">S3・DynamoDB へは Gateway 型で無料に</text>
  </g>
</svg>`,
  steps: [
    { text: "プライベートサブネットの EC2 が S3 を使うとき、何もしないと **NAT ゲートウェイ → IGW** を通って S3 の公開の入口へ行く。NAT ゲートウェイは **時間料金＋処理したデータ量の料金** がかかるので、大量に読み書きすると高くつく。" },
    { text: "**Gateway 型 VPC エンドポイント** を作り、ルートテーブルに「S3 宛て → エンドポイント」を足すと、NAT を通らず AWS の中で直接 S3 へ行ける。**エンドポイント自体は料金なし**（S3 と DynamoDB だけが対象）。" },
    { text: "同じ VPC の中でも、**AZ をまたぐ通信は有料**。同じ AZ 内でプライベート IP 同士なら無料。ただし高可用性のためのマルチ AZ はやめない（要件が優先）。" },
    { text: "インターネットとの間は、**AWS に入ってくる受信は基本無料、AWS から出ていく送信は有料**。送信が多いなら CloudFront でキャッシュして減らす。" },
    { text: "つまり「**プライベートサブネットから S3/DynamoDB への大量通信のコスト削減** → NAT ではなく **Gateway 型エンドポイント**」。" }
  ]
},
{
  id: "monitoring",
  lessons: [13],
  notes: ["監視・監査・コンプライアンス（CloudWatch / CloudTrail / Config）"],
  title: "1つの出来事を、性能・操作・設定の3つの目で見る",
  svg: `<svg viewBox="0 0 460 590" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="monitoring-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
  </defs>
  <rect x="80" y="14" width="300" height="50" rx="8" class="f-ngz"/>
  <text x="230" y="36" text-anchor="middle" class="f-tb">出来事：EC2 が急に重い</text>
  <text x="230" y="55" text-anchor="middle" class="f-ts">誰かがインスタンスを小さくした？</text>

  <g data-s="1">
    <path d="M80,39 L12,39 L12,160 L22,160" class="f-flow" marker-end="url(#monitoring-am)"/>
    <rect x="24" y="100" width="416" height="120" rx="8" class="f-box"/>
    <text x="40" y="126" class="f-tm">CloudWatch</text>
    <text x="40" y="146" class="f-ts">メトリクス・ログ・アラーム</text>
    <text x="40" y="176" class="f-tb">「いま重い？」</text>
    <text x="40" y="204" class="f-ts">アラーム → SNS で通知</text>
    <path d="M260,114 L260,200 L430,200" class="f-line"/>
    <text x="266" y="126" class="f-ts">CPU</text>
    <path d="M260,150 L430,150" class="f-ng"/>
    <text x="268" y="168" class="f-ts">しきい値 80%</text>
    <path d="M262,190 L300,188 L340,185 L370,160 L400,130 L428,126" class="f-flow"/>
    <text x="430" y="118" text-anchor="end" class="f-tng">アラーム！</text>
  </g>

  <g data-s="2">
    <path d="M12,160 L12,300 L22,300" class="f-flow" marker-end="url(#monitoring-am)"/>
    <rect x="24" y="240" width="416" height="120" rx="8" class="f-box"/>
    <text x="40" y="266" class="f-tm">CloudTrail</text>
    <text x="40" y="286" class="f-ts">API の操作記録（監査）</text>
    <text x="40" y="316" class="f-tb">「誰が何をした？」</text>
    <text x="40" y="344" class="f-ts">いつ・誰が・どの API</text>
    <rect x="250" y="256" width="180" height="88" rx="6" class="f-box2"/>
    <text x="262" y="278" class="f-ts">02:03 user-A</text>
    <text x="262" y="300" class="f-ts">ModifyInstance</text>
    <text x="262" y="318" class="f-ts">Attribute</text>
    <text x="262" y="336" class="f-ts">送信元 IP も残る</text>
  </g>

  <g data-s="3">
    <path d="M12,300 L12,440 L22,440" class="f-flow" marker-end="url(#monitoring-am)"/>
    <rect x="24" y="380" width="416" height="120" rx="8" class="f-box"/>
    <text x="40" y="406" class="f-tm">AWS Config</text>
    <text x="40" y="426" class="f-ts">設定の状態と変更履歴</text>
    <text x="40" y="456" class="f-tb">「設定はどう変わった？」</text>
    <text x="40" y="484" class="f-ts">ルールで違反をチェック</text>
    <rect x="250" y="396" width="180" height="88" rx="6" class="f-box2"/>
    <text x="262" y="418" class="f-ts">変更前 m5.large</text>
    <text x="262" y="440" class="f-ts">変更後 t3.micro</text>
    <text x="262" y="468" class="f-tng">ルール違反</text>
  </g>

  <g data-s="4">
    <text x="230" y="530" text-anchor="middle" class="f-tm">重い？ 性能・死活 → CloudWatch</text>
    <text x="230" y="552" text-anchor="middle" class="f-tm">誰がやった？ → CloudTrail</text>
    <text x="230" y="574" text-anchor="middle" class="f-tm">設定の履歴・ルール違反 → Config</text>
  </g>
</svg>`,
  steps: [
    { text: "「EC2 が急に重い」という1つの出来事を3つの目で見る。まず **CloudWatch** は**性能**の目。CPU 使用率などのメトリクスを集め、しきい値を超えたら**アラーム → SNS で通知**。メモリ使用率は CloudWatch エージェントを入れると取れる。" },
    { text: "**CloudTrail** は**操作記録**の目。「**誰が・いつ・どの API を呼んだか**」が残るので、深夜 2:03 に user-A がインスタンスの設定を変えた（ModifyInstanceAttribute）と分かる。長く残すなら証跡（Trail）を作って S3 へ。" },
    { text: "**AWS Config** は**設定**の目。リソースの設定が**いつ・どう変わったか**の履歴を持ち、「許可したインスタンスタイプだけ使う」などの**ルールに違反していないか**を評価する。自動修復もできる。" },
    { text: "つまり「**性能・死活・アラーム** → CloudWatch」「**誰が操作したか（監査）** → CloudTrail」「**設定の変更履歴・ルール準拠** → Config」。" }
  ]
}
);
