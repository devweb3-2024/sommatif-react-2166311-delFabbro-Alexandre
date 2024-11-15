import React, { useState, useEffect } from 'react';
import Carte from './carte.component';
import { Grid, Paper, Box, Modal, Typography } from '@mui/material';

//Création du type pour une carte
type CarteType = {
    id: number;
    image: string;
    estRetournee: boolean;
    trouvee: boolean;
}

//Les cartes
const cartesInitiales = [
    { id: 1, image: '/chat1.png', estRetournee: false, trouvee: false },
    { id: 2, image: '/chat2.png', estRetournee: false, trouvee: false },
    { id: 3, image: '/chat3.png', estRetournee: false, trouvee: false },
    { id: 4, image: '/chat4.png', estRetournee: false, trouvee: false },
    { id: 5, image: '/chat5.png', estRetournee: false, trouvee: false },
    { id: 6, image: '/chat6.png', estRetournee: false, trouvee: false },
    { id: 7, image: '/chat7.png', estRetournee: false, trouvee: false },
    { id: 8, image: '/chat8.png', estRetournee: false, trouvee: false },
]

/**
 * Fonction du composant du jeu
 * Auteur: Alexandre del Fabbro
 * Code inspiré du cours de Développement Web 3 - Cégep de Victoriaville - Automne 2024
 * Professeur: Étienne Rivard
 * Aussi inspiré de m_lind
 * https://codesandbox.io/p/sandbox/memory-game-using-react-uyv1d - [Consulté le 15 novembre 2024]
 */
export default function Jeu() {
    //Le nombre d'essais restants
    const [essaisRestant, setEssaisRestants] = useState(20);
    //Le nombre de paires retournées
    const [nombreReussi, setNombreReussi] = useState(0);
    //La première carte retournée
    let [premiereCarte, setPremiereCarte] = useState<CarteType | null>(null);
    //La deuxième carte retournée
    let [deuxiemeClic, setDeuxiemeClic] = useState(false);
    //L'attente avant de retourner les cartes
    let [attente, setAttente] = useState(false);
    //Les cartes mélangées
    const [cartesMelangees, setCartesMelangees] = React.useState<CarteType[]>([]);

    //Mélanger les cartes en début de partie
    useEffect(() => {
        const cartesPartie = [...cartesInitiales, ...cartesInitiales]
            .sort(() => Math.random() - 0.5)
            .map(carte => ({ ...carte }));
        setCartesMelangees(cartesPartie);
    }, []);

    //Vérifier si les cartes retournées sont semblables
    const verification = (carte: CarteType) => {
        //Lorsque réussi
        if (premiereCarte && carte.id === premiereCarte.id) {
            const changerCartes = cartesMelangees.map(c => {
                if (c.id === carte.id) {
                    return { ...c, trouvee: true }
                }
                return c;
            });
            setCartesMelangees(changerCartes);
            setNombreReussi(nombreReussi + 1);
            if (nombreReussi >= 7) {
                <Modal
                    open={true}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Vous avez perdu.
                        </Typography>
                    </Box>
                </Modal>
            }
            setPremiereCarte(null);
            setAttente(false);
        //Pas réussi
        } else {
            setAttente(true);
            setTimeout(() => {
                const changerCartes = cartesMelangees.map(c => {
                    if (c.id === carte.id || (premiereCarte && c.id === premiereCarte.id)) {
                        return { ...c, estRetournee: false };
                    }
                    return c;
                });
                setCartesMelangees(changerCartes);
                setPremiereCarte(null);
                setAttente(false);
            }, 1000);
        }
    };

    //Pour gérer le clic sur une carte
    const handleClicCarte = (carte: CarteType) => {
        if (attente || carte.estRetournee || carte.trouvee) {
            return;
        } else {
            carte.estRetournee = true;
        }

        if (!deuxiemeClic) {
            setPremiereCarte(carte);
            setDeuxiemeClic(true);
        } else {
            setDeuxiemeClic(false);
            verification(carte);
            setEssaisRestants(essaisRestant - 1);
            if (essaisRestant <= 0) {
                <Modal
                    open={true}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Vous avez perdu.
                        </Typography>
                    </Box>
                </Modal>
            }
        }
    };

    return (
        <div className="jeu">
            <h4>Essais restants: {essaisRestant}</h4>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
                <Grid container spacing={2} sx={{ maxWidth: 800, justifyContent: "center" }}>
                    {cartesMelangees.map(carte => (
                        <Grid item xs={3}>
                            <Paper sx={{ width: 150, height: 150 }}>
                                <Carte
                                    key={carte.id}
                                    image={carte.image}
                                    estRetournee={carte.estRetournee || carte.trouvee}
                                    onClick={() => {
                                        handleClicCarte(carte)
                                    }}
                                    trouvee={carte.trouvee}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}