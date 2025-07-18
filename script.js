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
    nodeOverlap: 20,
    gravity: 1,
    quality: "proof"
  },
  minZoom: 1,
  maxZoom: 7,
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

/* cy.on('tap', function(e){
   if (e.target === cy)  {
      cy.elements().removeClass('highlight');
      cy.elements().removeClass('fade');  
   }
}); */

cy.on('tap', 'edge', function(e){
  cy.elements().removeClass('highlight', 'fade');
  var edge = e.target;
  if ( edge === 'edge' && "motif" in edge.data() ) {
    var m = edge.data("motif");
    cy.edges("edge[motif = '" + m + "']").forEach(function(edge) {
      edge.addClass("highlight");
    });
    cy.nodes("node." + m).forEach(function(node) {
      node.addClass("highlight");
    });
    cy.edges().difference("edge[motif = '" + m + "']").forEach(function(edge) {
      edge.addClass("fade");
    });
    cy.nodes().difference("node." + m).forEach(function(node) {
      node.addClass("fade");
    });
    cy.animate({
      fit: {
        eles: cy.nodes("node." + m),
        padding: 20
      }
    },
    { duration: 1000 });
  }
});

/* cy.on('tap', 'cy', function(){
    cy.elements().forEach(function(ele) {
      ele.removeClass("highlight");
    });
}); */

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