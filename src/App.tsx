import './App.css';
import Jeu from './components/jeu.component'

/**
 * La fonction de l'application
 * Auteur: Alexandre del Fabbro
 * Code inspiré du cours de Développement Web 3 - Cégep de Victoriaville - Automne 2024
 * Professeur: Étienne Rivard
 */
function App() {

  return (
    <>
      <div className="App">
        {/* Bouton pour relancer l'application */}
        <button onClick={() => window.location.reload()}>Relancer le jeu</button>
        <h3>Jeu de mémoire</h3>
        <Jeu />
      </div>

    </>
  );
}

export default App;
