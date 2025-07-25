Promise.all([
  fetch('cystyle.json', {mode: 'no-cors'})
    .then(function(res) {
      return res.json()
    }),
  fetch('data.json', {mode: 'no-cors'})
    .then(function(res) {
      return res.json()
    }),
  fetch('links.json', {mode: 'no-cors'})
    .then(function(res) {
      return res.json()
    }),
])
.then(function(dataArray) {

var cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'fcose',
    randomize: true,
    animate: true,
    fit: true,
    nodeRepulsion: 40000,
    componentSpacing: 80,
    nodeOverlap: 200,
    gravity: 0.5,
    idealEdgeLength: 30,
    quality: "proof"
  },
  minZoom: 0.8,
  maxZoom: 6,
  style: dataArray[0],
  elements: dataArray[1]
});

///////////////////////////// Interactive functions

cy.on('tap', function(e){
   if (e.target === cy)  {
      cy.elements().removeClass('fade');
      cy.elements().removeClass('highlight');
      cy.elements().removeStyle();
      motifInfoOff();
      songInfoOff();
   }
});

// SONG INFO

cy.on('tap', 'node', function(e){
  var node = e.target;
  var sc = node.data('sclasses') //
  console.info( 'sclasses is ' + sc ); //
  var sImg = node.data("img");
  var sImgBorder = node.style("border-color");
    document.getElementById('songimg').src = sImg; //img
    document.getElementById('songimg').style.border = "1.4px solid " + sImgBorder; //img border
  var sName = node.data("label");
    document.getElementById('songname').innerHTML = sName; //name
  var sId = node.id();
  var sOst = "no data";
    if (sId > 100 && sId < 800) {
      sOst = "Chapter " + sId.charAt(0);
    } else if (sId < 100) {
      sOst = "Undertale";
    } else {
      sOst = "Other";
    }
  document.getElementById('songost').innerHTML = sOst; //ost
  var sBandcamp = dataArray[2].songs.find(song => song.id === sId).bandcamp;
  var sYoutube = dataArray[2].songs.find(song => song.id === sId).youtube;
  if ( sBandcamp != "none" ){
    document.getElementById('songbandcamp').href = sBandcamp; //bandcamp
    document.getElementById('songbandcamp').innerHTML = "Bandcamp";
    document.getElementById('linkor').innerHTML = " or ";
  } else {
    document.getElementById('songbandcamp').href = ''; //empty bandcamp field
    document.getElementById('songbandcamp').innerHTML = '';
    document.getElementById('linkor').innerHTML = '';
  }
  document.getElementById('songyoutube').href = sYoutube; //youtube
  var classlist = node.classes();
  var sMotifs = '';
  for (i = 0; i < classlist.length; i++) {
    if (classlist[i] === "fade") { continue; } //skip "fade" class
    var cyEdges = cy.edges("edge[motif = '" + classlist[i] + "']");
    var mc = cyEdges.style("line-color");
    sMotifs += '<li style="color:' + mc + '">' + fullMotif(classlist[i]) + '</li>';
  }
  document.getElementById('songmotifs').innerHTML = sMotifs; //colored motif list
  songInfoOn();
});

// EDGE HIGHLIGHT

cy.on('tap', 'edge', function(e){
  cy.elements().removeClass('fade');
  cy.elements().removeClass('highlight');
  cy.elements().removeStyle();
  motifInfoOff();

  var edge = e.target;
  if ( "motif" in edge.data() ) {
    var m = edge.data("motif");
    var mn = "no data";
    mn = fullMotif(m); //convert motif name
    var mc = edge.style("line-color");
    cy.edges("edge[motif = '" + m + "']").forEach(function(edge) { //highlight edges
      edge.addClass("highlight");
    });
    cy.nodes("node." + m).forEach(function(node) { //color node borders
      node.style("border-color", mc );
      node.style("border-width", 0.4 );
    });
    cy.edges().difference("edge[motif = '" + m + "']").forEach(function(edge) { //fade other edges
      edge.addClass("fade");
    });
    cy.nodes().difference("node." + m).forEach(function(node) { //fade other nodes
      node.addClass("fade");
    });
    document.getElementById('motifname').innerHTML = mn;
    document.getElementById("motifname").style.color = mc;
    motifInfoOn(); //open motif info element
    cy.maxZoom(4); //limit zoom
    cy.animate({
      fit: {
        eles: cy.nodes("node." + m),
        padding: 40
      }
    },
    { duration: 800 });
    cy.maxZoom(6); //reset zoom
  }
});

// End of cy functions

});

// Motif name conversion // delete

function fullMotif(m) {
    switch (m) {
      case "once": mn = "Once Upon a Time"; break;
      case "ghost": mn = "Ghost Fight"; break;
      case "dont": mn = "Don't Forget"; break;
      case "nightmare": mn = "Your Best Nightmare"; break;
      case "neo": mn = "Power of NEO"; break;
      case "gaster": mn = "Gaster's Theme"; break;
      case "hopes": mn = "Hopes and Dreams"; break;
      case "door": mn = "The Door / Nightmare Knight"; break;
      case "girl": mn = "Girl Next Door / Lost Girl"; break;
      case "legend": mn = "The Legend"; break;
      case "freedom": mn = "Freedom Theme / The World Revolving"; break;
      case "bigshot": mn = "BIG SHOT"; break;
      case "hey": mn = "HEY EVERY !"; break;
      case "holy": mn = "The Holy"; break;
      case "rudebuster": mn = "Rude Buster"; break;
      case "scarletforest": mn = "Scarlet Forest"; break;
      case "cardcastle": mn = "Card Castle"; break;
      case "sweet": mn = "Sweet Cap'n Cakes"; break;
      case "darknessfalls": mn = "Darkness Falls"; break;
      case "cyber": mn = "Cyber's World"; break;
      case "rouxls": mn = "Rouxls Kaard"; break;
      case "pandora": mn = "Pandora Palace"; break;
      case "burn": mn = "Burn in Despair!"; break;
      case "powers": mn = "Powers Combined"; break;
      case "dummy": mn = "Dummy!"; break;
      case "uwa": mn = "Uwa!!♫"; break;
      case "hipshop": mn = "Hip Shop"; break;
      case "doomboard": mn = "Doom Board"; break;
      case "maracas": mn = "Dog Check (Maracas)"; break;
      case "dogg": mn = "d.ogg"; break;
      default: mn = m;
    }
    return mn;
}

// Menus

function aboutOn() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("about").style.display = "block";
}
function thanksOn() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("thanks").style.display = "block";
}
function menuOff() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("thanks").style.display = "none";
}

// Motif/Song info

function motifInfoOn() {
  document.getElementById("motifinfo").style.display = "block";
}
function motifInfoOff() {
  document.getElementById("motifinfo").style.display = "none";
}

function songInfoOn() {
  document.getElementById("songinfo").style.display = "block";
}
function songInfoOff() {
  document.getElementById("songinfo").style.display = "none";
}