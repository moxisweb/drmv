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
    nodeRepulsion: 6500,
    componentSpacing: 40,
    nodeOverlap: 6,
    gravity: 1,
    quality: "proof"
  },
  minZoom: 1,
  maxZoom: 7,
  wheelSensitivity: 1.2,
  autoungrabify: true,
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

});

//////////////////////////////////////////////////////////////

// Interactive function: tap node to select + open song info (WIP)

// Interactive function: tap edge to color shared motif (WIP)

cy.on('tap', 'edge', function(){
  cy.nodes().select();
});

/* cy.on('tap', 'edge', function(evt){
  var edge = evt.target;
  if ("motif" in edge.data()) {
    var m = edge.data("motif");
    cy.elements("edge[motif = '" + m + "']").forEach(function(ele) {
      ele.addClass("highlight");
    });
    cy.nodes("node." + m).forEach(function(node) {
      node.addClass("highlight");
    });
  }
}); */

/* cy.on('tap', 'cy', function(){
    cy.elements().forEach(function(ele) {
      ele.removeClass("highlight");
    });
}); */

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