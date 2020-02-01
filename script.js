var plateau = [
[0, 0, 0, 0, 0, 0, 0],
[1, 1, 1, 1, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
];

var hauteur_plateau = 6;
var largeur_plateau = 7;

var creerPlateau = function(hauteur_plateau, largeur_plateau) {
	
	var plateau = [];
	
	for (var i = 0; i < hauteur_plateau; i++) {
		plateau.push([]);
		for (var j = 0; j < largeur_plateau; j++) {
			plateau[i].push(0);
		}
	}
	
	table = document.getElementById("plateau");

	for (i = 0; i < hauteur_plateau; i++) {
		tr = document.createElement('TR');
		for (j = 0; j < largeur_plateau; j++) {
			td = document.createElement('TD');
			td.id= String(i)+String(j);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

var verifierVictoire = function(joueurCourant) {
	
	var coords_victoire = [];
	var victoire = false;
	
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
	
	return [coords_victoire, victoire];
}
