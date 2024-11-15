/**
 * Fonction du composant d'une carte
 * Auteur: Alexandre del Fabbro
 * Code inspiré du cours de Développement Web 3 - Cégep de Victoriaville - Automne 2024
 * Professeur: Étienne Rivard
 */
interface CarteProps {
    image: string;
    estRetournee: boolean;
    onClick: () => void;
    trouvee: boolean;
}

export default function Carte(props: CarteProps) {
    //Variable pour gérer l'image affichée
    let image = props.estRetournee || props.trouvee ? props.image : '/dessus-carte.svg';

    return (
        <div className="carte" onClick={props.onClick}>
            <img src={image} alt="carte" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};