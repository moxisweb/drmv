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
        'height': '10px', // to try node.degree() as height/weight
        'width': '10px',
        'background-color': 'purple',
        'label': 'data(label)',
        /* 'font-family': 'VT323', */
        'font-size': 4,
        'text-justification': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '30px',
        'text-margin-y': '1px',
        'color': '#fff',
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
        'background-color': 'red'
      }
    },
    {
      selector: '.other',
      style: {
        'background-color': 'blue'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 0.3,
        'line-color': '#555',
        'curve-style': 'bezier',
        'target-arrow-color': '#555',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 0.2
      }
    }
  ],
   elements: [
/*
  (((CLASSES)))
  SONG INFO:
    Is origin/main reference of a motif ['main']
    Has no leitmotif ['none']
    Song from Undertale ['undertale']
    Song from Deltarune ['deltarune'] (NOT IMPLEMENTED)
    Song from other ['other']
  HAS LEITMOTIF (UNDERTALE)
    Once Upon a Time ['u001']
    Gaster's Theme ['u666']
    ...etc ['u+id']
  HAS LEITMOTIF (DELTARUNE)
    Don't Forget ['d001']
    The Door / Nightmare Knight ['d002']
    The Legend ['d003']
    ...etc ['d+id']
*/
    // Nodes.songs.other
    { data: { id: 'x01', label: 'Nightmare Knight - Cucumber Quest' }, classes: ['other'] },
    { data: { id: 'x02', label: 'Theme - Rose of Winter' }, classes: ['other'] },
    // Nodes.songs.undertale
    { data: { id: '001', label: 'Once Upon a Time' }, classes: ['undertale'] },
    { data: { id: '011', label: 'Determination' }, classes: ['undertale'] },
    { data: { id: '022', label: 'Snowdin Town' }, classes: ['undertale'] },
    { data: { id: '079', label: 'Your Best Nightmare' }, classes: ['undertale'] },
    { data: { id: '666', label: "Gaster's Theme" }, classes: ['undertale'] },
    // Nodes.songs.deltarune
    { data: { id: '101', label: 'ANOTHER HIM', origin: ['666'] }, classes: ['main'], },
    { data: { id: '102', label: 'Beginning', origin: ['001', '139'] } },
    { data: { id: '103', label: 'School', origin: ['137', '022', '139'] } },
    { data: { id: '104', label: 'Susie' }, classes: ['main'] },
    { data: { id: '105', label: 'The Door', origin: ['x01'] }, classes: ['main'] },
    { data: { id: '106', label: 'Cliffs' }, classes: ['none'] },
    { data: { id: '107', label: 'The Chase', origin: ['105'] } },
    { data: { id: '108', label: 'The Legend' }, classes: ['main'] },
    { data: { id: '109', label: 'Lancer' }, classes: ['main'] },
    { data: { id: '110', label: 'Rude Buster', origin: ['011'] }, classes: ['main'] },
    { data: { id: '111', label: 'Empty Town', origin: ['108'] } },
    { data: { id: '112', label: 'Weird Birds' }, classes: ['none'] },
    { data: { id: '113', label: 'Field of Hopes and Dreams', origin: ['139'] } },
    { data: { id: '114', label: 'Fanfare (From Rose of Winter)', origin: ['x02'] } },
    { data: { id: '115', label: 'Lantern', origin: ['110', '108'] } },
    { data: { id: '116', label: "I'm Very Bad", origin: ['109'] } },
    { data: { id: '117', label: 'Checker Dance' }, classes: ['none'] },
    { data: { id: '118', label: 'Quiet Autumn', origin: ['119'] } },
    { data: { id: '119', label: 'Scarlet Forest' } }, //don't forget, gaster?
    { data: { id: '120', label: 'Thrash Machine', origin: ['109'] } },
    { data: { id: '121', label: 'Vs. Lancer', origin: ['109'] } },
    { data: { id: '122', label: 'Basement', origin: ['125']  } },
    { data: { id: '123', label: 'Imminent Death', origin: ['079']  } },
    { data: { id: '124', label: 'Vs. Susie', origin: ['104', '123']  } },
    { data: { id: '125', label: 'Card Castle', origin: ['109']  }, classes: ['main'] },
    { data: { id: '126', label: 'Rouxls Kaard' }, classes: ['main']  },
    { data: { id: '127', label: 'April 2012' }, classes: ['none']  },
    { data: { id: '128', label: 'Hip Shop', origin: ['126'] }, },
    { data: { id: '129', label: '' } },
    { data: { id: '130', label: '' } },
    { data: { id: '131', label: '' } },
    { data: { id: '132', label: '' } },
    { data: { id: '133', label: 'THE WORLD REVOLVING' } },
    { data: { id: '134', label: 'Friendship' } },
    { data: { id: '135', label: '' } },
    { data: { id: '136', label: '' } },
    { data: { id: '137', label: 'A Town Called Hometown' } },
    { data: { id: '138', label: '' } },
    { data: { id: '139', label: "Don't Forget" } },
    { data: { id: '140', label: '' } },
    { data: { id: '141', label: '' } },
  ]
});

/* cy.ready(function BuildEdges()  {            // Wait for nodes to be added
    cy.layout(                     // Call layout
    ).run();
}); */

/* for (let i = 0; i < cy.nodes(); i++ ) {
  if (ele.origin) {
        var edge = { id: ele.origin + ' ' + ele.id, source: ele.origin, target: ele.id };
        var edges = edges.push(edge);
        cy.add(edge);
      }
} */

// var coll = cy.$('node[origin]')

cy.nodes().forEach(function( ele ){
    cy.add({
      group: 'edges',
      data: { source: ele.data().origin, target: ele.id() }
    })
});
