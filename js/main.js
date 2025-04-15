
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

  new Chart(document.getElementById("consoleChart"), {
    type: 'doughnut',
    data: {
      labels: ['Playstation 2', 'Gamecube', 'Nintendo DS', 'Nintendo Switch', 'Playstation 4 Pro'],
      datasets: [{
        label: 'Consoles',
        data: [12, 9, 10, 6, 13],
        backgroundColor: ['#ff6384', '#ffce56', '#4bc0c0', '#36a2eb', '#ff69b4']
      }]
    },
    options: {
      responsive: true
    }
  });

  async function getPokemonTypes() {
    const types = {
      normal: 0, fighting: 0, flying: 0, poison: 0, ground: 0,
      rock: 0, bug: 0, ghost: 0, steel: 0, fire: 0,
      water: 0, grass: 0, electric: 0, psychic: 0, ice: 0,
      dragon: 0, dark: 0, fairy: 0, unknown: 0, shadow: 0
    };
  
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#66FF66', '#FF6699', '#66CCFF', '#FF9933',
      '#CCCCFF', '#FF6666', '#99CC00', '#00CC99', '#CC99FF',
      '#FFCC00', '#33CCCC', '#FF99CC', '#3399FF', '#999999'
    ];
  
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * 500) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
      const data = await res.json();
      data.types.forEach(t => {
        const type = t.type.name;
        if (types[type] !== undefined) types[type]++;
      });
    }
  
    const ctx = document.getElementById("pokemonChart").getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(types),
        datasets: [{
          label: "Pokemon types",
          data: Object.values(types),
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  getPokemonTypes();
  