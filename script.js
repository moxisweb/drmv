Promise.all([
  fetch('cystyle.json', {mode: 'no-cors'})
    .then(function(res) {
      return res.json()
    }),
  fetch('data.json', {mode: 'no-cors'})
    .then(function(res) {
      return res.json()
    })
])
  .then(function(dataArray) {

var cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'fcose',
    randomize: true,
    animate: true,
    fit: true,
    nodeRepulsion: 12500,
    componentSpacing: 80,
    nodeOverlap: 200,
    gravity: 1,
    quality: "proof"
  },
  minZoom: 1,
  maxZoom: 6,
  wheelSensitivity: 1.2,
  style: dataArray[0],
  elements: dataArray[1]
});

/* const array1 = cy.nodes();
array1.forEach(function( ele ){
  if ("ori1" in ele.data()) {
    for (let i = (ele.data().ori1.length) - 1 ; i > -1 ; i--) {
      cy.add({
        group: 'edges',
        data: { source: ele.data().ori1[i], target: ele.id() },
        classes: ['ori1']
      })
    }
  }
  return 0;
});

var fulllayout = cy.layout({
  name: 'fcose'
});
fulllayout.run(); */

//////////////////////////////////////////////////////////////

// Interactive function: tap node to select + open song info (WIP)

/* cy.on('tap', 'node', function (e) {
    var node = e.target;
        node.addClass('highlight');
}); */

// Interactive function: tap edge to color shared motif (WIP)

cy.on('tap', function(e){
   if (e.target === cy)  {
      cy.elements().removeClass('fade');
      cy.elements().removeClass('highlight');
      cy.elements().removeStyle();
      motifInfoOff();
   }
});

cy.on('tap', 'edge', function(e){
  cy.elements().removeClass('fade');
  cy.elements().removeClass('highlight');
  cy.elements().removeStyle();
  motifInfoOff();

  var edge = e.target;
  if ( "motif" in edge.data() ) {
    var m = edge.data("motif");
    var mn = "no data";
    switch (m) {
      case "once":
        mn = "Once Upon a Time";
        break;
      case "ghost":
        mn = "Ghost Fight";
        break;
      case "dont":
        mn = "Don't Forget";
        break;
      case "nightmare":
        mn = "Your Best Nightmare";
        break;
      case "neo":
        mn = "Power of NEO";
        break;
      case "gaster":
        mn = "Gaster's Theme";
        break;
      case "hopes":
        mn = "Hopes and Dreams";
        break;
      case "door":
        mn = "The Door / Nightmare Knight";
        break;
      case "girl":
        mn = "Girl Next Door / Lost Girl";
        break;
      case "legend":
        mn = "The Legend";
        break;
      case "freedom":
        mn = "Freedom Theme / The World Revolving";
        break;
      case "bigshot":
        mn = "BIG SHOT";
        break;
      case "hey":
        mn = "HEY EVERY !";
        break;
      case "holy":
        mn = "The Holy";
        break;
      case "scarletforest":
        mn = "Scarlet Forest";
        break;
      case "cardcastle":
        mn = "Card Castle";
        break;
      case "sweet":
        mn = "Sweet Cap'n Cakes";
        break;
      case "DarknessFalls":
        mn = "Darkness Falls";
        break;
      case "cyber":
        mn = "A CYBER'S WORLD";
        break;
      case "rouxls":
        mn = "Rouxls Kaard";
        break;
      case "pandora":
        mn = "Pandora Palace";
        break;
      case "burn":
        mn = "Burn in Despair!";
        break;
      case "powers":
        mn = "Powers Combined";
        break;
      default:
        mn = m;
    }
    var mc = edge.style("line-color");
    cy.edges("edge[motif = '" + m + "']").forEach(function(edge) { //highlight edges
      edge.addClass("highlight");
    });
    cy.nodes("node." + m).forEach(function(node) { //color node borders
      node.style("border-color", mc );
    });
    cy.edges().difference("edge[motif = '" + m + "']").forEach(function(edge) { //fade other edges
      edge.addClass("fade");
    });
    cy.nodes().difference("node." + m).forEach(function(node) { //fade other nodes
      node.addClass("fade");
    });
    document.getElementById('motifname').innerHTML = mn;
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

// Menu buttons

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