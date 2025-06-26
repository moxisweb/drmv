$.getJSON("data.json", function (data) {

var cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'cose'
  },
  minZoom: 2,
  maxZoom: 8,
  wheelSensitivity: 1.2,
  autoungrabify: true,
  style: [
    {
      selector: 'node',
      style: {
        'shape': 'rectangle',
        'height': '15px',
        'width': '15px',
        'background-color': 'black',
        'outline-width': 0.8,
        'outline-color': 'purple',
        'label': 'data(label)',
        'font-size': 4,
        'text-justification': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '30px',
        'text-margin-y': '2.5px',
        'color': '#fff',
        'text-outline-color': '#000',
        'text-outline-width': 0.5,
        'text-valign': 'bottom',
        'text-halign': 'center'
      }
    },
    {
      selector: '.main',
      style: {
        'font-weight': 'bold'
      }
    },
    {
      selector: '.none',
      style: {
        'opacity': '0.3'
      }
    },
    {
      selector: '.undertale',
      style: {
        'outline-color': 'red'
      }
    },
    {
      selector: '.other',
      style: {
        'outline-color': 'blue'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 0.35,
        'line-color': '#fff',
        'opacity': 0.8,
        'curve-style': 'unbundled-bezier',
        'control-point-step-size': 8,
        'target-arrow-color': '#fff',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 0.3,
        'target-distance-from-node': 2,
        'target-endpoint': 'outside-to-line-or-label'
      }
    },
    {
      selector: '.ori2',
      style: {
        'width': 0.25,
        'opacity': '0.5'
      }
    },
    {
      selector: '.ori3',
      style: {
        'width': 0.3,
        'line-style': 'dotted',
        'opacity': '0.5'
      }
    }
  ],
   elements: data,
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
  name: 'cose'
});
fulllayout.run();

// Menus

function aboutOn() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("about").style.display = "block";
}
function thanksOn() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("thanks").style.display = "block";
}
function infoOff() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("thanks").style.display = "none";
}

});