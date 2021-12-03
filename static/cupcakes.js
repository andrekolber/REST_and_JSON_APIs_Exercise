const BASE_URL = 'http://localhost:5000/api/cupcakes';

// generate html for cupcake with provided data
function generateCupcakeHTML(cupcake) {
	return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-button btn btn-danger">X</button>
        </li>
        <img class="Cupcake-img"
                src="${cupcake.image}"
                alt="(no image provided)">
    </div>
    `;
}

async function showExistingCupcakes() {
	const resp = await axios.get(`${BASE_URL}`);

	for (let cupcakeData of resp.data.cupcakes) {
		let newCupcake = $(generateCupcakeHTML(cupcakeData));
		$('#cupcakes-list').append(newCupcake);
	}
}

$('#new-cupcake-form').on('submit', async function(evt) {
	evt.preventDefault();

	let flavor = $('#flavor').val();
	let rating = $('#rating').val();
	let size = $('#size').val();
	let image = $('#image').val();

	const newCupcakeResponse = await axios.post(`${BASE_URL}`, {
		flavor,
		rating,
		size,
		image,
	});

	let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
	$('#cupcakes-list').append(newCupcake);
	$('#new-cupcake-form').trigger('reset');
});

$('#cupcakes-list').on('click', '.delete-button', async function(evt) {
	evt.preventDefault();
	let $cupcake = $(evt.target).closest('div');
	let $cupcakeId = $cupcake.attr('data-cupcake-id');

	await axios.delete(`${BASE_URL}/${$cupcakeId}`);
	$cupcake.remove();
});

$(showExistingCupcakes);
