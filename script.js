/* fetch('data.json', {mode: 'no-cors'})
  .then(function(res) {
    return res.json()
  })
  .then(function(data) { */

var cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'cose'
  },
  minZoom: 2,
  maxZoom: 8,
  wheelSensitivity: 2,
  autoungrabify: true,
  style: [
    {
      selector: 'node',
      style: {
        'shape': 'rectangle',
        'height': '10px',
        'width': '10px',
        'background-color': 'red',
        'label': 'data(label)',
        'font-family': 'VT323',
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
      selector: 'edge',
      style: {
        'width': 0.2,
        'line-color': '#5A1',
        'curve-style': 'bezier',
        'target-arrow-color': '#aaa',
        'target-arrow-shape': 'none'
      }
    }
  ],
   elements: [
    // Nodes.songs
    { data: { id: '101', label: 'ANOTHER HIM' }, classes: ['gaster', 'classtest'] },
    { data: { id: '102', label: 'Beginning' } },
    { data: { id: '103', label: 'School' } },
    { data: { id: '104', label: 'Susie' } },
    { data: { id: '105', label: 'The Door' } },
    { data: { id: '106', label: 'Cliffs' } },
    { data: { id: '107', label: 'The Chase' } },
    { data: { id: '108', label: 'The Legend' } },
    { data: { id: '109', label: 'Lancer' } },
    { data: { id: '110', label: 'Rude Buster' } },
    { data: { id: '111', label: 'Empty Town' } },
    { data: { id: '112', label: 'Weird Birds' } },
    { data: { id: '113', label: 'Field of Hopes and Dreams' } },
    { data: { id: '114', label: 'Fanfare (From Rose of Winter)' } },
    { data: { id: '115', label: 'Lantern' } },
    { data: { id: '116', label: "I'm Very Bad" } },
    { data: { id: '117', label: 'Checker Dance' } },
    { data: { id: '118', label: 'Quiet Autumn' } },
    { data: { id: '119', label: 'Scarlet Forest' } },
    { data: { id: '120', label: '' } },
    { data: { id: '121', label: '' } },
    { data: { id: '122', label: '' } },
    { data: { id: '123', label: '' } },
    { data: { id: '124', label: '' } },
    { data: { id: '125', label: '' } },
    { data: { id: '126', label: '' } },
    { data: { id: '127', label: '' } },
    { data: { id: '128', label: '' } },
    { data: { id: '129', label: '' } },
    { data: { id: '130', label: '' } },
    { data: { id: '131', label: '' } },
    { data: { id: '132', label: '' } },
    { data: { id: '133', label: 'THE WORLD REVOLVING' } },
    { data: { id: '134', label: 'Friendship' } },
    { data: { id: '135', label: '' } },
    { data: { id: '136', label: '' } },
    { data: { id: '137', label: '' } },
    { data: { id: '138', label: '' } },
    { data: { id: '139', label: "Don't Forget" } },
    { data: { id: '140', label: '' } },
    { data: { id: '141', label: '' } },

    // Edges.
    { data: { id: '139_102', source: '139', target: '102' } },
    { data: { id: '139_103', source: '139', target: '103' } },
    { data: { id: '139_113', source: '139', target: '113' } },
    { data: { id: '139_119', source: '139', target: '119' } },
    { data: { id: '139_133', source: '139', target: '133' } },
    { data: { id: '139_134', source: '139', target: '134' } }
  ]

/*   elements: data
  }); */

});