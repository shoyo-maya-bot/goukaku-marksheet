// SAA の図解。仕様は /home/claude/site/FIG_SCHEMA.md
window.FIGS = window.FIGS || {};
window.FIGS.saa = window.FIGS.saa || [];
window.FIGS.saa.push({
  id: "vpc-basics",
  lessons: [4],
  notes: ["VPCの基礎（サブネット・ルートテーブル・IGW/NAT）"],
  title: "VPCの中で、パブリックとプライベートはルートテーブルで決まる",
  svg: `<svg viewBox="0 0 460 490" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="vpc-basics-am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="f-ahm"/></marker>
    <marker id="vpc-basics-ang" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="f-ahng"/></marker>
  </defs>
  <rect x="130" y="10" width="180" height="40" rx="20" class="f-box2"/>
  <text x="220" y="35" text-anchor="middle" class="f-tb">インターネット</text>

  <g data-s="1">
    <rect x="10" y="88" width="420" height="392" rx="10" class="f-zone"/>
    <text x="24" y="114" class="f-tb">VPC 10.0.0.0/16</text>
  </g>

  <g data-s="2">
    <rect x="24" y="126" width="392" height="140" rx="8" class="f-pub"/>
    <text x="38" y="148" class="f-tb">パブリックサブネット</text>
    <text x="38" y="164" class="f-ts">10.0.1.0/24</text>
    <rect x="40" y="176" width="130" height="42" rx="6" class="f-box"/>
    <text x="105" y="202" text-anchor="middle" class="f-t">Webサーバー</text>

    <rect x="24" y="282" width="392" height="140" rx="8" class="f-priv"/>
    <text x="38" y="304" class="f-tb">プライベートサブネット</text>
    <text x="38" y="320" class="f-ts">10.0.2.0/24</text>
    <rect x="260" y="334" width="140" height="42" rx="6" class="f-box"/>
    <text x="330" y="360" text-anchor="middle" class="f-t">データベース</text>
  </g>

  <g data-s="3">
    <rect x="170" y="70" width="100" height="34" rx="6" class="f-zone2"/>
    <text x="220" y="92" text-anchor="middle" class="f-tm">IGW</text>
    <line x1="220" y1="50" x2="220" y2="70" class="f-line"/>
    <path d="M170,190 C196,190 196,140 196,104" class="f-flow" marker-end="url(#vpc-basics-am)" marker-start="url(#vpc-basics-am)"/>
    <rect x="40" y="228" width="200" height="28" rx="5" class="f-box"/>
    <text x="50" y="247" class="f-ts">ルート 0.0.0.0/0 → IGW</text>
  </g>

  <g data-s="4">
    <rect x="270" y="176" width="130" height="42" rx="6" class="f-zone2"/>
    <text x="335" y="202" text-anchor="middle" class="f-tm">NAT ゲートウェイ</text>
    <path d="M330,334 L330,220" class="f-flow" marker-end="url(#vpc-basics-am)"/>
    <path d="M335,176 C335,130 285,112 256,104" class="f-flow" marker-end="url(#vpc-basics-am)"/>
    <text x="320" y="326" class="f-tm" text-anchor="end">外へは出られる</text>
    <rect x="40" y="384" width="230" height="28" rx="5" class="f-box"/>
    <text x="50" y="403" class="f-ts">ルート 0.0.0.0/0 → NAT ゲートウェイ</text>
  </g>

  <g data-s="5">
    <path d="M312,26 C452,40 452,330 404,352" class="f-ng" marker-end="url(#vpc-basics-ang)"/>
    <text x="220" y="448" text-anchor="middle" class="f-tng">外から DB へ直接は入れない</text>
    <text x="220" y="466" text-anchor="middle" class="f-ts">プライベート側のルートに IGW 行きがないため</text>
  </g>
</svg>`,
  steps: [
    { text: "AWS の中に、自分専用のネットワーク **VPC** を作る。ここでは住所の範囲を 10.0.0.0/16 にした。" },
    { text: "VPC を **サブネット** という区画に分ける。Web サーバーはパブリックサブネットに、データベースはプライベートサブネットに置く。" },
    { text: "インターネットとの出入り口 **IGW** を VPC に付ける。パブリック用ルートテーブルに「0.0.0.0/0（行き先すべて）→ IGW」を書くと、そのサブネットはインターネットと行き来できる。**これが「パブリック」の正体**。" },
    { text: "データベースも更新ファイルの取得などで外に出たいときは、パブリックサブネットに **NAT ゲートウェイ** を置き、プライベート用ルートテーブルを「0.0.0.0/0 → NAT」にする。中から外へは出られる。" },
    { text: "でも外から DB へ直接入る道はない。プライベートサブネットのルートテーブルに IGW 行きがないから。**IGW へのルートがあるかないか**で、パブリックとプライベートが決まる。" }
  ]
});
