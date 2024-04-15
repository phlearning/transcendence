export default function renderTournament() {

	return `

		<div class="row">
			<div class="col text-center fw-bold pt-3">
				<h1>Tournament</h1>
			</div>
		</div>
		<div class="row" id="players">
			<div class="col text-center fw-bold pt-3">
				<h3>Entrez les noms des joueurs</h3>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player1" placeholder="Joueur 1" aria-label="Joueur 1" value="a"/>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player2" placeholder="Joueur 2" aria-label="Joueur 2" value="b"/>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player3" placeholder="Joueur 3" aria-label="Joueur 3" value="c"/>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player4" placeholder="Joueur 4" aria-label="Joueur 4" value="d"/>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player5" placeholder="Joueur 5" aria-label="Joueur 5" value="e"/>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player6" placeholder="Joueur 6" aria-label="Joueur 6" value="f"/>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player7" placeholder="Joueur 7" aria-label="Joueur 7" value="g"/>
			</div>
			<div class="player d-flex justify-content-center pt-1">
				<input type="text" class="form-control w-auto" id="player8" placeholder="Joueur 8" aria-label="Joueur 8" value="h"/>
			</div>
			<div class="d-flex justify-content-center pt-2">
				<button class="btn btn-info" id="startTournament">Démarrer le tournoi</button>
			</div>
			<div class="d-flex justify-content-center pt-2">
				<button class="btn btn-info" id="DEBUGstartTournament">DEBUG TOURNOI RAPIDE</button>
			</div>
		</div>
		<div class="row" id="title">
			<div class="col-5 d-flex justify-content-left" id="next_match"></div>
			<div class="col-2 d-flex justify-content-center" id="current_match"></div>
			<div class="col-5"></div>
		</div>
		<div class="row">
			<div class="col"></div>
			<div class="col d-flex justify-content-center align-items-center">
				<div class="position-absolute d-none">
					<button class="btn btn-primary" type="button" id="startGame2">Start the game</button>
				</div>
				<div class="text-bg-success border border-black border-5 d-none">
					<canvas id="board_two" width="650" height="480"></canvas>
				</div>
			</div>
			<div class="col"></div>
		</div>
		<div class="row" id="bracketContainer"></div>

	`;
};