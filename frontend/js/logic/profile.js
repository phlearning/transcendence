import router from "./router.js"

var g_games_2p;
var g_ratio_2p;
var g_points_2p;
var g_games_4p;
var g_ratio_4p;
var g_points_4p;

var csrftoken;

async function updateNickname(nicknameForm) {

	// remove a potential error message from the field
	document.getElementById("form__update--nickname--msg").textContent = "";
	document.getElementById("form__update--nickname--msg").classList.remove("text-danger");
	document.getElementById("form__update--nickname--msg").classList.remove("text-info");

	const input = nicknameForm.elements;

	const init = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({nickname: input.nickname.value}),
		credentials: 'same-origin',
		referrerPolicy: 'same-origin',
	};

	try {
		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/profile/', init);

		if (response.status === 400) {
			const error = await response.text();
			document.getElementById("form__update--nickname--msg").textContent = error.replace(/["{}[\]]/g, '');
			document.getElementById("form__update--nickname--msg").classList.add("text-danger");
			return;
		}
		if (response.status === 200) {
			const data = await response.json();

			sessionStorage.setItem("nickname", data.nickname);

			document.getElementById("form__update--nickname--msg").textContent = "Your nickname was successfully updated.";
			document.getElementById("form__update--nickname--msg").classList.remove("text-danger");
			document.getElementById("form__update--nickname--msg").classList.add("text-info");

			window.location.reload();
		}

	} catch (e) {
		console.error(e);
	}
};

async function updatePassword(passwordForm) {

	// remove a potential error message from the field
	document.getElementById("form__update--password--msg").textContent = "";
	document.getElementById("form__update--password--msg").classList.remove("text-danger");
	document.getElementById("form__update--password--msg").classList.remove("text-info");

	const input = passwordForm.elements;

	if (input.password_one.value !== input.password_two.value) {
		document.getElementById("form__update--password--msg").textContent = "The passwords are not the same";
		document.getElementById("form__update--password--msg").classList.add("text-danger");
		return;
	}

	const init = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({password: input.password_one.value})
	};

	try {

		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/profile/', init);

		if (response.status === 400) {
			const error = await response.text();
			document.getElementById("form__update--password--msg").textContent = error.replace(/["{}[\]]/g, '');
			document.getElementById("form__update--password--msg").classList.add("text-danger");
			return;
		}
		if (response.status === 200) {
			const data = await response.json();

			document.getElementById("form__update--password--msg").textContent = "Your password was successfully updated.";
			document.getElementById("form__update--password--msg").classList.remove("text-danger");
			document.getElementById("form__update--password--msg").classList.add("text-info");
		}
	} catch (e) {
		console.error(e);
	}
};

async function updateAvatar(avatarForm) {

	// remove a potential error message from the field
	document.getElementById("form__update--avatar--msg").textContent = "";
	document.getElementById("form__update--avatar--msg").classList.remove("text-danger");
	document.getElementById("form__update--avatar--msg").classList.remove("text-info");

	let data = new FormData();
	data.append('avatar', document.getElementById("form__update--avatar--input").files[0]);

	const init = {
		method: 'PATCH',
		headers: {
			'X-CSRFToken': csrftoken,
		},
		body: data,
	};

	try {

		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/updateavatar/', init);

		if (response.status === 400) {
			const error = await response.text();

			document.getElementById("form__update--avatar--msg").textContent = error.replace(/["{}[\]]/g, '');
			document.getElementById("form__update--avatar--msg").classList.add("text-danger");
			return;
		}
		if (response.status === 200) {
			const data = await response.json();

			sessionStorage.setItem("avatar", data.avatar);

			document.getElementById("form__update--avatar--msg").textContent = "Your avatar was successfully updated.";
			document.getElementById("form__update--avatar--msg").classList.remove("text-danger");
			document.getElementById("form__update--avatar--msg").classList.add("text-info");

			window.location.reload();
		}
	} catch (e) {
		console.error(e);
	}
};

async function deleteAccount() {

	const init = {
		headers: {
			'X-CSRFToken': csrftoken,
		},
	};

	try {
		// const response = await fetch('', init);

		window.alert("Your account was sucessfully erased from our memory.");

		router("login");
	} catch (e) {
		console.error(e);
	}
};

function updateStats() {

	let ratioGlobal;
	if (g_ratio_2p === "no data" && g_ratio_4p === "no data") {
		ratioGlobal = "no data";
	}
	else if (g_ratio_2p === "no data") {
		ratioGlobal = Number(g_ratio_4p) + "%";
		g_ratio_4p = g_ratio_4p.toFixed(2) + "%";
	}
	else if (g_ratio_4p === "no data") {
		ratioGlobal = Number(g_ratio_2p) + "%";
		g_ratio_2p = g_ratio_2p.toFixed(2) + "%";
	}
	else {
		ratioGlobal = ((Number(g_ratio_2p) + Number(g_ratio_4p)) / 2).toFixed(2) + "%";
	}

	document.getElementById("collapse__myStats--global--played").textContent = g_games_2p + g_games_4p;
	document.getElementById("collapse__myStats--global--wlrate").textContent = ratioGlobal;
	document.getElementById("collapse__myStats--global--points").textContent = g_points_2p + g_points_4p;
	document.getElementById("collapse__myStats--2player--played").textContent = g_games_2p;
	document.getElementById("collapse__myStats--2player--wlrate").textContent = g_ratio_2p + "%";
	document.getElementById("collapse__myStats--2player--points").textContent = g_points_2p;
	document.getElementById("collapse__myStats--4player--played").textContent = g_games_4p;
	document.getElementById("collapse__myStats--4player--wlrate").textContent = g_ratio_4p + "%";
	document.getElementById("collapse__myStats--4player--points").textContent = g_points_4p;
	document.getElementById("collapse__myStats--tournament--best").textContent = "no data";
	document.getElementById("collapse__myStats--tournament--matchwin").textContent = "no data";
	document.getElementById("collapse__myStats--tournament--points").textContent = "no data";
};

function listenerProfile() {

	csrftoken = document.cookie.split("; ").find((row) => row.startsWith("csrftoken"))?.split("=")[1];

	document.getElementById("profile__avatar--big").src = sessionStorage.getItem("avatar") !== null ? sessionStorage.getItem("avatar") : "/frontend/img/person-circle-Bootstrap.svg";
	document.getElementById("profile__username--big").textContent = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : "user";
	document.getElementById("profile__nickname--big").textContent = sessionStorage.getItem("nickname");

	updateStats();

	const nicknameForm = document.getElementById("form__update--nickname");
	const passwordForm = document.getElementById("form__update--password");
	const avatarForm = document.getElementById("form__update--avatar");
	const deleteAccountBtn = document.getElementById("form__update--delete--account--btn");

	const collapseStats = document.getElementById("collapse__myStats");
	const collapseUpdate = document.getElementById("collapse__updateProfile");

	collapseStats.addEventListener("show.bs.collapse", e => {

		collapseUpdate.classList.replace("show", "collapsing");
		collapseUpdate.classList.remove("collapsing");
	});

	collapseUpdate.addEventListener("show.bs.collapse", e => {

		collapseStats.classList.replace("show", "collapsing");
		collapseStats.classList.remove("collapsing");
	});

	nicknameForm.addEventListener("submit", e => {
		e.preventDefault();
		updateNickname(nicknameForm);
	});

	passwordForm.addEventListener("submit", e => {
		e.preventDefault();
		updatePassword(passwordForm);
	});

	avatarForm.addEventListener("submit", e => {
		e.preventDefault();
		updateAvatar(avatarForm);
	});

	deleteAccountBtn.addEventListener("click", e => {
		e.preventDefault();

		deleteAccount();
	});
};

async function loadProfile() {

	const csrftoken = document.cookie.split("; ").find((row) => row.startsWith("csrftoken"))?.split("=")[1];

	const init = {
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		}
	};

	try {

		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/profile/', init);

		if (!response.ok) {
			const text = await response.text();
			throw new Error(text.replace(/["{}[\]]/g, ''));
		}
		const data = await response.json();

		g_games_2p = data["player"].nb_games_2p;
		if (g_games_2p !== 0)
			g_ratio_2p = Number(((data["player"].nb_games_2p_won / g_games_2p) * 100).toFixed(2));
		else
			g_ratio_2p = "no data";
		g_games_4p = data["player"].nb_games_4p;
		if (g_games_4p !== 0)
			g_ratio_4p = Number(((data["player"].nb_games_4p_won / g_games_4p) * 100).toFixed(2));
		else
			g_ratio_4p = "no data";
		g_points_2p = data["player"].nb_points_2p;
		g_points_4p = data["player"].nb_points_4p;

		return 1;
	} catch (e) {
		console.error("loadProfile: " + e);
		return 0;
	}
};

export default {
	listenerProfile,
	loadProfile
};
