var couleur_joueurs = {1: "purple", 2:"green"};

var colonnes_libres = [];
var coords_victoire = [];
var plateau = [];

var joueurCourant = 1;
var hauteur_plateau = 10;
var largeur_plateau = 10;

var victoire = false;

var initialisation = function() {
	// colonnes_libres
	
	for (var i = 0; i < largeur_plateau; i++) {
		colonnes_libres.push(i)
	}
	
	document.body.style.background = couleur_joueurs[joueurCourant];
	
	creerPlateau();
}


var creerPlateau = function() {
	for (var i = 0; i < hauteur_plateau; i++) {
		plateau.push([]);
		for (var j = 0; j < largeur_plateau; j++) {
			plateau[i].push(0);
		}
	}
	
	var table = document.getElementsByTagName("table")[0];

	for (i = 0; i < hauteur_plateau; i++) {
		tr = document.createElement("tr");
		for (j = 0; j < largeur_plateau; j++) {
			td = document.createElement("td");
			td.id= String(i)+String(j);
			td.onclick = ajouterPion(j);
			div = document.createElement("div");
						div.onmouseenter = selectionner(j);
			div.onmouseout = deselectionner(j);
			div.className = String(j);
			td.appendChild(div);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

var colonnesLibres = function() {

}

var ajouterPion = function(rang_colonne) {
	var callback = function() {
		if (colonnes_libres.includes(rang_colonne) == true) {
			var i = 0
			while (i < hauteur_plateau && plateau[i][rang_colonne] == 0) {
				i++;
			}
			plateau[i-1][rang_colonne] = joueurCourant;
						
			var cellule = document.getElementById(String(i-1)+String(rang_colonne));
			
			switch (joueurCourant) {
				case 1:
					cellule.style.background = couleur_joueurs[joueurCourant];
					break;
				case 2:
					cellule.style.background = couleur_joueurs[joueurCourant];
					break;
			}
			colonnesLibres();
			verifierVictoire();
		}
	}
	return callback;
}

var verifierVictoire = function() {
	
	//aligneess descendantes
	
	for (var y = 0; y < hauteur_plateau-3; y++) {
		for (var x = 0; x < largeur_plateau-3; x++) {
			if (plateau[y][x] == joueurCourant) {
				
				var alignees = true;
				var i = 1;
				
				while (alignees == true && i < 4) {
					if (plateau[y+i][x+i] != joueurCourant) {
						alignees = false;
					}
					i++;
				}
				
				if (alignees == true) {
					for (var i = 0; i < 4; i++) {
						coords_victoire.push([y+i,x+i]);
					}
				}
			}
		}
	}
	
	//aligneess montantes
	
	for (var y = 0; y < hauteur_plateau-3; y++) {
		for (var x = 3; x < largeur_plateau; x++) {
			if (plateau[y][x] == joueurCourant) {
				
				var alignees = true;
				var i = 1;
				
				while (alignees == true && i < 4) {
					if (plateau[y+i][x-i] != joueurCourant) {
						alignees = false;
					}
					i++;
				}
				
				if (alignees == true) {
					for (var i = 0; i < 4; i++) {
						coords_victoire.push([y+i,x-i]);
					}
				}
			}
		}
	}
	
	//verticales
	
	for (var y = 0; y < hauteur_plateau-3; y++) {
		for (var x = 0; x < largeur_plateau; x++) {
			if (plateau[y][x] == joueurCourant) {
				
				var alignees = true;
				var i = 1;
				
				while (alignees == true && i < 4) {
					if (plateau[y+i][x] != joueurCourant) {
						alignees = false;
					}
					i++;
				}
				
				if (alignees == true) {
					for (var i = 0; i < 4; i++) {
						coords_victoire.push([y+i,x]);
					}
				}
			}
		}
	}
	
	//horizontales
	
	for (var y = 0; y < hauteur_plateau; y++) {
		for (var x = 0; x < largeur_plateau-3; x++) {
			if (plateau[y][x] == joueurCourant) {
				
				var alignees = true;
				var i = 1;
				
				while (alignees == true && i < 4) {
					if (plateau[y][x+i] != joueurCourant) {
						alignees = false;
					}
					i++;
				}
				
				if (alignees == true) {
					for (var i = 0; i < 4; i++) {
						coords_victoire.push([y,x+i]);
					}
				}
			}
		}
	}
	

	
	if (coords_victoire.length > 0) {
		victoire = true;
	}
	
	if (victoire == true) {
		afficherVictoire();
	} else {
		prochainJoueur();
	}
}

var afficherVictoire = function() {
	colonnes_libres = [];
	console.log(joueurCourant);
}

var prochainJoueur = function() {
	switch (joueurCourant) {
		case 1:
			joueurCourant = 2;
			break;
		case 2:
			joueurCourant = 1;
			break;
	}
	document.body.style.background = couleur_joueurs[joueurCourant];
}


var selectionner = function(rang_colonne) {
	var callback = function() {
		if (colonnes_libres.includes(rang_colonne) == true) {
			colonne = document.getElementsByClassName(String(rang_colonne));
			for (var i = 0; i < colonne.length; i++) {
				if (colonne[i].classList.contains("selection") == false) {
					colonne[i].classList.add("selection");
				}
			}
		}
	}
	return callback;
}

var deselectionner = function(rang_colonne) {
	var callback = function() {
		colonne = document.getElementsByClassName(String(rang_colonne));
		for (var i = 0; i < colonne.length; i++) {
			if (colonne[i].classList.contains("selection") == true) {
				colonne[i].classList.remove("selection");
			}
		}
	}
	return callback;
}