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
    name: 'spread'
  },
  //minZoom: 2,
  //maxZoom: 8,
  wheelSensitivity: 1.2,
  autoungrabify: true,
  style: dataArray[0],
  elements: dataArray[1]
});

const array1 = cy.nodes();

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

array1.forEach(function( ele ){
  if ("ori2" in ele.data()) {
    for (let i = (ele.data().ori2.length) - 1 ; i > -1 ; i--) {
      cy.add({
        group: 'edges',
        data: { source: ele.data().ori2[i], target: ele.id() },
        classes: ['ori2']
      })
    }
  }
  return 0;
});

var fulllayout = cy.layout({
  name: 'spread'
});
fulllayout.run();

});

//////////////////////////////////////////////////////////////

// Interactive function: tap node to select + open song info (WIP)

cy.on('tap', 'node', function(evt){
  var node = evt.target;
  console.log( 'tapped ' + node.id() );
});

// Interactive function: tap edge to color shared motif (WIP)

cy.on('tap', 'edge', function(evt){
  var edge = evt.target;
  if ("motif" in edge.data()) {
    var m = edge.data("motif");
    cy.elements("edge[motif = '" + m + "']").forEach(function(ele) {
      ele.addClass("highlight");
    });
  }
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

// Song info

function songInfoOn() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("songinfo").style.display = "block";
}