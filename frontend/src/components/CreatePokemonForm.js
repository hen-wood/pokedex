import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPokemonTypes, postNewPokemon } from "../store/pokemon";
import ErrorMessage from "./ErrorMessage";
const CreatePokemonForm = ({ hideForm, pokemon }) => {
	const pokeTypes = useSelector(state => state.pokemon.types);
	const dispatch = useDispatch();
	const history = useHistory();
	const [number, setNumber] = useState(1);
	const [attack, setAttack] = useState("");
	const [defense, setDefense] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [name, setName] = useState("");
	const [type, setType] = useState(pokeTypes[0]);
	const [move1, setMove1] = useState("");
	const [move2, setMove2] = useState("");

	const updateNumber = e => setNumber(e.target.value);
	const updateAttack = e => setAttack(e.target.value);
	const updateDefense = e => setDefense(e.target.value);
	const updateImageUrl = e => setImageUrl(e.target.value);
	const updateName = e => setName(e.target.value);
	const updateType = e => setType(e.target.value);
	const updateMove1 = e => setMove1(e.target.value);
	const updateMove2 = e => setMove2(e.target.value);

	const [errors, setErrors] = useState({});

	useEffect(() => {
		dispatch(getPokemonTypes());
	}, [dispatch]);

	useEffect(() => {
		if (pokeTypes.length && !type) {
			setType(pokeTypes[0]);
		}
	}, [pokeTypes, type]);

	const handleSubmit = async e => {
		e.preventDefault();

		const newPokemon = {
			number,
			attack,
			defense,
			imageUrl,
			name,
			type,
			move1,
			move2,
			moves: [move1, move2],
			captured: true
		};

		const res = await dispatch(postNewPokemon(newPokemon));
		if (res.id) {
			history.push(`/pokemon/${res.id}`);
			hideForm();
			return;
		} else {
			setErrors(res.errors);
			res.errors.number && setNumber("");
			res.errors.attack && setAttack("");
			res.errors.defense && setDefense("");
			res.errors.name && setName("");
			res.errors.imageUrl && setImageUrl("");
			return;
		}
	};

	const handleCancelClick = e => {
		e.preventDefault();
		hideForm();
	};
	return (
		<section className="new-form-holder centered middled">
			<form className="create-pokemon-form" onSubmit={handleSubmit}>
				<input
					type="number"
					placeholder="Number"
					min="1"
					value={number}
					onChange={updateNumber}
				/>
				{errors.number && (
					<ErrorMessage label="Number" message={errors.number} />
				)}
				<input
					type="number"
					placeholder="Attack"
					min="0"
					max="100"
					value={attack}
					onChange={updateAttack}
				/>
				{errors.attack && (
					<ErrorMessage label="Attack" message={errors.attack} />
				)}
				<input
					type="number"
					placeholder="Defense"
					min="0"
					max="100"
					value={defense}
					onChange={updateDefense}
				/>
				{errors.defense && (
					<ErrorMessage label="Defense" message={errors.defense} />
				)}
				<input
					type="text"
					placeholder={"Image URL"}
					value={imageUrl}
					onChange={updateImageUrl}
				/>
				{errors.imageUrl && (
					<ErrorMessage label="Image URL" message={errors.imageUrl} />
				)}
				<input
					type="text"
					placeholder={"Name"}
					value={name}
					onChange={updateName}
				/>
				{errors.name && <ErrorMessage label="Name" message={errors.name} />}
				<input
					type="text"
					placeholder="Move 1"
					value={move1}
					onChange={updateMove1}
				/>
				<input
					type="text"
					placeholder="Move 2"
					value={move2}
					onChange={updateMove2}
				/>
				<select onChange={updateType} value={type}>
					{pokeTypes.map(type => (
						<option key={type}>{type}</option>
					))}
				</select>
				<button type="submit">Create new Pokemon</button>
				<button type="button" onClick={handleCancelClick}>
					Cancel
				</button>
			</form>
		</section>
	);
};

export default CreatePokemonForm;
