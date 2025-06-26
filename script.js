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
   elements: [

    // Nodes.leitmotifs
    { data: { id: 'l01', label: 'Freedom Motif', ori2: ['101'] }, classes: ['leitmotif'] },
    // Nodes.songs.other
    { data: { id: 'x01', label: 'Nightmare Knight - Cucumber Quest' }, classes: ['other'] },
	  { data: { id: 'x03', label: 'Penumbra Phantasm' }, classes: ['other'] },
    // Nodes.songs.undertale
    { data: { id: '001', label: 'Once Upon a Time' }, classes: ['undertale'] },
    { data: { id: '011', label: 'Determination' }, classes: ['undertale'] },
    { data: { id: '022', label: 'Snowdin Town' }, classes: ['undertale'] },
    { data: { id: '079', label: 'Your Best Nightmare' }, classes: ['undertale'] },
    { data: { id: '666', label: "Gaster's Theme" }, classes: ['undertale'] },
    // Ch.1
    { data: { id: '101', label: 'ANOTHER HIM', ori1: ['666'] }, classes: ['main'], },
    { data: { id: '102', label: 'Beginning', ori1: ['001', '139'] } },
    { data: { id: '103', label: 'School', ori1: ['137', '022', '139'] } },
    { data: { id: '104', label: 'Susie' }, classes: ['main'] },
    { data: { id: '105', label: 'The Door', ori2: ['x01'] }, classes: ['main'] },
    { data: { id: '106', label: 'Cliffs' }, classes: ['none'] },
    { data: { id: '107', label: 'The Chase', ori1: ['105'] } },
    { data: { id: '108', label: 'The Legend' }, classes: ['main'] },
    { data: { id: '109', label: 'Lancer' }, classes: ['main'] },
    { data: { id: '110', label: 'Rude Buster', ori2: ['011'] }, classes: ['main'] },
    { data: { id: '111', label: 'Empty Town', ori1: ['108'] } },
    { data: { id: '112', label: 'Weird Birds' }, classes: ['none'] },
    { data: { id: '113', label: 'Field of Hopes and Dreams', ori1: ['139'] } },
    { data: { id: '114', label: 'Fanfare (From Rose of Winter)' }, classes: ['none'] },
    { data: { id: '115', label: 'Lantern', ori1: ['110', '108'] } }, //legend where?
    { data: { id: '116', label: "I'm Very Bad", ori1: ['109'] } },
    { data: { id: '117', label: 'Checker Dance' }, classes: ['none'] },
    { data: { id: '118', label: 'Quiet Autumn', ori1: ['119'] } },
    { data: { id: '119', label: 'Scarlet Forest' } }, //don't forget, gaster?
    { data: { id: '120', label: 'Thrash Machine', ori1: ['109'] } },
    { data: { id: '121', label: 'Vs. Lancer', ori1: ['109'] } },
    { data: { id: '122', label: 'Basement', ori1: ['125'] } },
    { data: { id: '123', label: 'Imminent Death', ori1: ['079']  } },
    { data: { id: '124', label: 'Vs. Susie', ori1: ['104', '123']  } },
    { data: { id: '125', label: 'Card Castle', ori1: ['109'] }, classes: ['main'] },
    { data: { id: '126', label: 'Rouxls Kaard' }, classes: ['main'] },
    { data: { id: '127', label: 'April 2012' }, classes: ['none'] },
    { data: { id: '128', label: 'Hip Shop' } },
    { data: { id: '129', label: 'Gallery' } },
    { data: { id: '130', label: 'Chaos King', ori1: ['109', '125'] } },
    { data: { id: '131', label: 'Darkness Falls', ori1: ['101'] } },
    { data: { id: '132', label: 'The Circus', ori1: ['108', '133', 'l01'] } },
    { data: { id: '133', label: 'THE WORLD REVOLVING', ori1: ['105', '139', 'l01'] } },
    { data: { id: '134', label: 'Friendship', ori1: ['139'] } },
    { data: { id: '135', label: 'THE HOLY', ori1: ['x03'] } },
    { data: { id: '136', label: 'Your Power', ori1: ['139'] } },
    { data: { id: '137', label: 'A Town Called Hometown', ori1: ['108', '022', '139'] } },
    { data: { id: '138', label: 'You Can Always Come Home', ori1: ['001','139'] } },
    { data: { id: '139', label: "Don't Forget" }, classes: ['main'] },
    { data: { id: '140', label: 'Before The Story', ori1: ['001'] } }
  ]
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