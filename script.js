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
  fetch('songlist.json', {mode: 'no-cors'})
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
    nodeRepulsion: 120000,
    componentSpacing: 800,
    nodeOverlap: 200,
    gravity: 0.1,
    idealEdgeLength: 40,
    quality: "proof"
  },
  minZoom: 0.5,
  maxZoom: 6,
  style: dataArray[0],
  elements: dataArray[1]
});

///////////////////////////// Auto functions

// SLABEL CREATION
cy.nodes().forEach(function(node) { 
  var nodeLabel = node.data('label');
  var nodeSLabel = nodeLabel.replace( /[\W_\s]+/g, '' ).toLowerCase();
  node.data( "slabel", nodeSLabel );
  });

///////////////////////////// Interactive functions

var listedlist = [];

// CLEAR
cy.on('tap', function(e){
   if (e.target === cy)  {
      cy.elements().removeClass('fade');
      cy.elements().removeClass('highlight');
      cy.elements().removeStyle();
      document.getElementById('motifname').innerHTML = "";
      motifInfoOff();
      songInfoOff();
      listedlist = [];
   }
});

// SONG INFO
cy.on('tap', 'node', function(e){
  var node = e.target;
  var sImg = node.data("img");
  var sImgBorder = node.style("border-color");
    document.getElementById('songimg').src = sImg; //img
    document.getElementById('songimg').style.border = "1.4px solid " + sImgBorder; //img border
  var sName = node.data("label");
    document.getElementById('songname').innerHTML = sName; //name
  var sId = node.id();
  var sOst = "no data";
  var sTrack = "no data";
    if (sId > 100 && sId < 800) {
      sOst = "Chapter " + sId.charAt(0);
      sTrack = "#" + sId.charAt(1) + sId.charAt(2);
    } else if (sId < 100) {
      sOst = "Undertale";
      sTrack = "#" + sId.charAt(1) + sId.charAt(2);
    } else {
      sOst = "Other";
      sTrack = "";
    }
  document.getElementById('songost').innerHTML = sTrack + "<br>" + sOst; //ost
  var sBandcamp = dataArray[2].songs.find(song => song.id === sId).bandcamp;
  var sYoutube = dataArray[2].songs.find(song => song.id === sId).youtube;
  if ( sBandcamp != "none" ){
    document.getElementById('songbandcamp').href = sBandcamp; //bandcamp
    document.getElementById('songbandcamp').innerHTML = "Bandcamp";
    document.getElementById('linkor').innerHTML = " or ";
  } else {
    document.getElementById('songbandcamp').href = ''; //empty bandcamp field and connecting words if none
    document.getElementById('songbandcamp').innerHTML = '';
    document.getElementById('linkor').innerHTML = '';
  }
  document.getElementById('songyoutube').href = sYoutube; //youtube
  var classlist = node.classes();
  var weak = node.data("weak");
  var notes = node.data("notes");
  console.log( 'weak data is: ' + weak );
  var sMotifs = '';
  for (i = 0; i < classlist.length; i++) {
    if (classlist[i] === "fade" || classlist[i] === "highlight" || classlist[i] === "dogg" ) { continue; } //skip classes
    var cyEdges = cy.edges("edge[motif = '" + classlist[i] + "']");
    var mc = cyEdges.style("line-color");
    sMotifs += '<li><span style="color:' + mc + '">' + fullMotif(classlist[i]) + '</span>';
    if (notes != undefined) {
      sMotifs += '<span>' + notes[i] + '</span>';
    }
    sMotifs += '</li>';
  }
  document.getElementById('songmotifs').innerHTML = sMotifs; //colored motif list
  var sDescription = dataArray[2].songs.find(song => song.id === sId).description;
  if (sDescription) {
    document.getElementById('songdescription').innerHTML = sDescription; //song description
  } else {
    document.getElementById('songdescription').innerHTML = "";
  }
  songInfoOn();
});

// EDGE HIGHLIGHT + MOTIF INFO
cy.on('tap', 'edge', function(e){
  cy.elements().removeClass('fade');
  var edge = e.target;
  if ( "motif" in edge.data() ) {
    var m = edge.data("motif");
    var mn = "no data"; //delete
    mn = fullMotif(m); //convert motif name
    var mc = edge.style("line-color");
    cy.edges("edge[motif = '" + m + "']").forEach(function(edge) { //highlight edges
      edge.addClass("highlight");
    });
    cy.nodes("node." + m).forEach(function(node) { //color node borders and highlight
      node.style("border-color", mc );
      node.style("border-width", 0.5 );
      node.addClass("highlight");
    });
    cy.edges().difference("edge[motif = '" + m + "']").forEach(function(edge) { //fade other edges
      edge.addClass("fade");
    });
    cy.nodes().difference("node." + m).forEach(function(node) { //fade other nodes
      node.addClass("fade");
    });
    if (listedlist.includes(m)) { // to exclude repeat selection
    } else {
      listedlist += m; // add to list to exclude if clicked again
      var outputHTML = '<span style="color:' + mc + '">' + mn + '</span><br>'; // prep latest motif name
      document.getElementById('motifname').innerHTML += outputHTML; // add to list
      motifInfoOn(); //open motif info element
      cy.maxZoom(4); //limit zoom
      cy.animate({
        fit: {
          eles: cy.nodes("node.highlight"),
          padding: 40
        }
      },
      { duration: 800 });
      cy.maxZoom(6); //reset zoom
    }
  }
});

// SEARCH AUTOCOMPLETE
var songlist = dataArray[3];
autocomplete(document.getElementById("myInput"), songlist);
function autocomplete(inp, arr) {
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /* SHOW RESULTS (CY FUNCTION) */
              var lInput = inp.value
              showResults(lInput);
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      var inp = this.value;
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        } else {
          showResults(inp);
        } //WIP
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

// SHOW RESULTS
function showResults(input) {
  var sInput = input.replace( /[\W_\s]+/g, '' ).toLowerCase();
  var results = cy.nodes("[slabel = '" + sInput + "']")
  if ( results.length != 0 ){
    cy.animate({
      fit: {
        eles: results,
        padding: 110
      }
    },
    { duration: 800 });
  }
}


// STORE POSITIONS
addEventListener('keydown', function(e) {
  if (e.key === 's' && e.ctrlKey) { //ctrl + s
    const nodes = cy.nodes();
    const nodePositions = {};
      for (let i = 0; i < nodes.length; i++) {
      nodePositions[nodes[i].id()] = nodes[i].position();
      }
    console.log(nodePositions);
  }
});

/* function storePositions() {
  const nodes = cy.nodes();
  const nodePositions = {};
  for (let i = 0; i < nodes.length; i++) {
    nodePositions[nodes[i].id()] = nodes[i].position();
  }
  return nodePositions;
} */

////////////////////////////////// End of cy functions

});

// Motif name conversion

function fullMotif(m) {
    switch (m) {
      case "once": mn = "Once Upon a Time"; break;
      case "ruins": mn = "Ruins/Waterfall"; break;
      case "ghost": mn = "Ghost Fight"; break;
      case "rain": mn = "It's Raining Somewhere Else"; break;
      case "dont": mn = "Don't Forget"; break;
      case "nightmare": mn = "Your Best Nightmare"; break;
      case "neo": mn = "Power of NEO"; break;
      case "gaster": mn = "Gaster's Theme"; break;
      case "hopes": mn = "Hopes and Dreams"; break;
      case "door": mn = "The Door"; break;
      case "girl": mn = "Lost Girl"; break;
      case "legend": mn = "The Legend"; break;
      case "freedom": mn = "Freedom Motif"; break;
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
      case "sanctuary": mn = "Dark Sanctuary"; break;
      case "justice": mn = "Spear of Justice"; break;
      case "maracas": mn = "Dog Check (Maracas)"; break;
      case "dogg": mn = "d.ogg"; break;
      case "darktruth": mn = "The Dark Truth (Your Best Nightmare?)"; break;
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