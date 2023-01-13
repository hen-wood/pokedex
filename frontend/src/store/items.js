export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
	type: LOAD_ITEMS,
	items,
	pokemonId
});

const update = item => ({
	type: UPDATE_ITEM,
	item
});

const add = item => ({
	type: ADD_ITEM,
	item
});

const remove = (itemId, pokemonId) => ({
	type: REMOVE_ITEM,
	itemId,
	pokemonId
});

export const getPokemonItems = pokemonId => async dispatch => {
	const response = await fetch(`/api/pokemon/${pokemonId}/items`);

	if (response.ok) {
		const items = await response.json();
		dispatch(load(items, pokemonId));
	}
};

/*
Edit an Item: PUT /api/items/:id
This route updates the item matching the id in the route parameter.

The payload that you must send looks like this:

{
  "id": 1,
  "happiness": 86,
  "imageUrl": "/images/pokemon_potion.svg",
  "name": "Awesome Plastic Pizza",
  "price": 27,
  "pokemonId": 1
}
Successful response is the updated item returned, which looks like this:

{
  "id": 1,
  "happiness": 86,
  "imageUrl": "/images/pokemon_potion.svg",
  "name": "Awesome Plastic Pizza",
  "price": 27,
  "pokemonId": 1
}
*/
export const editPokemonItem = item => async dispatch => {
	const res = await fetch(`/api/items/${item.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(item)
	});
	if (res.ok) {
		const item = await res.json();
		dispatch(update(item));
	}
};

const initialState = {};

const itemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ITEMS:
			const newItems = {};
			action.items.forEach(item => {
				newItems[item.id] = item;
			});
			return {
				...state,
				...newItems
			};
		case REMOVE_ITEM:
			const newState = { ...state };
			delete newState[action.itemId];
			return newState;
		case ADD_ITEM:
		case UPDATE_ITEM:
			return {
				...state,
				[action.item.id]: action.item
			};
		default:
			return state;
	}
};

export default itemsReducer;
