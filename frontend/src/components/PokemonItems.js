import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonItems, deletePokemonItem } from "../store/items";
const PokemonItems = ({ pokemon, setEditItemId }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPokemonItems(pokemon.id));
	}, [dispatch, pokemon.id]);

	const items = useSelector(state => {
		if (!pokemon.items) return null;
		return pokemon.items.map(itemId => state.items[itemId]);
	});

	if (!items) {
		return null;
	}

	const handleDeleteClick = async itemId => {
		dispatch(deletePokemonItem(itemId, pokemon.id));
	};

	return items.map(item => (
		<tr key={item.id}>
			<td>
				<img
					className="item-image"
					alt={item.imageUrl}
					src={`${item.imageUrl}`}
				/>
			</td>
			<td>{item.name}</td>
			<td className="centered">{item.happiness}</td>
			<td className="centered">${item.price}</td>
			{pokemon.captured && (
				<td className="centered">
					<button onClick={() => setEditItemId(item.id)}>Edit</button>
				</td>
			)}
			{pokemon.captured && (
				<td className="centered">
					<button onClick={() => handleDeleteClick(item.id)}>Delete</button>
				</td>
			)}
		</tr>
	));
};

export default PokemonItems;
