import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();

    const prof = getProfession(id);

    return !isLoading ? prof.name : "loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
