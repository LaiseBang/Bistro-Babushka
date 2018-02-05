	//de skarpe parenterser i variablen viser at det er et array
	let retter = [];

	document.addEventListener("DOMContentLoaded", hentJson);

	async function hentJson() {
		console.log("async function");
		let jsonData = await fetch("menu.json");
		retter = await jsonData.json();
		vis(retter, "Menu");
		lavFilter();
	}

	function vis(retter, overskrift) {
		console.log("vis retter");
		let temp = document.querySelector("[data-rettemplate]");
		let dest = document.querySelector("[data-liste]");
		dest.innerHTML = "";
		document.querySelector("[data-overskrift]").textContent = overskrift;
		//loop
		retter.forEach(ret => {
			let klon = temp.cloneNode(true).content;
			klon.querySelector("[data-navn]").textContent = ret.navn;

			/*kan bruges hvis man har brugt src"" og alt="" i im tagget*/
			klon.querySelector("[data-billede]").src = "imgs/small/" + ret.billede + "-sm.jpg";
			klon.querySelector("[data-billede]").alt = "Billede af " + ret.navn;
			klon.querySelector("[data-kortbeskrivelse]").textContent = ret.kortbeskrivelse;
			klon.querySelector("[data-pris]").textContent = ret.pris + ",- kr";
			klon.querySelector("[data-ret]").setAttribute("data-id", ret.id);
			klon.querySelector("[data-ret]").addEventListener("click", showSingle);
			dest.appendChild(klon);

			/*Alternativ måde at vælge billederne på */
			/*	klon.querySelector(".billede").setAttribute("src", "imgs/small/" + ret.billede + "-sm.jpg");
				klon.querySelector(".billede").setAttribute("alt", "Billede af " + ret.navn);*/
		});
	}

	function showSingle() {
		let myId = this.getAttribute("data-id");
		let single = retter.find(ret => {
			if (myId == ret.id) {
				document.querySelector("#popup").style.visibility = "visible";
				document.querySelector("[data-titel]").textContent = ret.navn;
				document.querySelector("[data-singleImg]").src = "imgs/medium/" + ret.billede + "-md.jpg";
				document.querySelector("[data-singleImg]").alt = "Billede af " + ret.navn;
				document.querySelector("[data-beskrivelse]").textContent = ret.langbeskrivelse;
				document.querySelector("[data-pris]").textContent = ret.pris + ",- kr";
				document.querySelector("button").addEventListener("click", closeModal);
			}
		})
	}

	function closeModal() {
		console.log("luk modal funktion");
		document.querySelector("#popup").style.visibility = "hidden";
	}

	function lavFilter() {
		console.log("filter");
		let forretter = retter.filter(ret => ret.kategori == "forretter");
		let hovedretter = retter.filter(ret => ret.kategori == "hovedretter");
		let sideorders = retter.filter(ret => ret.kategori == "sideorders");
		let desserter = retter.filter(ret => ret.kategori == "desserter");
		let drikkevarer = retter.filter(ret => ret.kategori == "drikkevarer");

		//sorter retter efter kategori
		document.querySelector("#filter-alle").addEventListener("click", () => {
			vis(retter, "Menu");
		});
		document.querySelector("#filter-forretter").addEventListener("click", () => {
			vis(forretter, "Forretter");
		});
		document.querySelector("#filter-hovedretter").addEventListener("click", () => {
			vis(hovedretter, "Hovedretter");
		});
		document.querySelector("#filter-sideorders").addEventListener("click", () => {
			vis(sideorders, "Sideorders");
		});
		document.querySelector("#filter-desserter").addEventListener("click", () => {
			vis(desserter, "Desserter");
		});
		document.querySelector("#filter-drikkevarer	").addEventListener("click", () => {
			vis(drikkevarer, "Drikkevarer");
		});
	}
