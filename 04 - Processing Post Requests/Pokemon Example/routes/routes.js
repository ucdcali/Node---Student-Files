import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('adventure', {
    title: 'Pokémon Adventure (Starter)',
    step: 1,
    state: {},
    outcome: null
  });
});

// One route handles all choices
router.post('/adventure', (req, res) => {
  const body = req.body || {};

  // state carried forward via hidden fields
  const state = {
    starter: body.starter || '',
    path: body.path || ''
  };

  // Figure out the current step:
  // Step 1: starter not chosen
  // Step 2: starter chosen, but path not chosen
  // Step 3: both chosen => outcome
  let step = 1;
  if (state.starter && !state.path) step = 2;
  if (state.starter && state.path) step = 3;

  // TODO 2: Create multiple outcomes based on starter + path
  // outcome should be an object: { heading: '...', text: '...' }
  let outcome = null;

  if (step === 3) {
    outcome = getOutcome(state);
  }

  res.render('adventure', {
    title: 'Pokémon Adventure (Starter)',
    step,
    state,
    outcome
  });
});

// TODO 3: Add at least 4 different endings
function getOutcome({ starter, path }) {
  // Example ending (students should add more!)
  if (starter === 'Charmander' && path === 'Battle') {
    return {
      heading: '🔥 The Blaze Challenger',
      text: 'You pick fights with every trainer you see. Bold… and effective.'
    };
  }

  // Default ending
  return {
    heading: '🎒 The Wandering Trainer',
    text: 'Your journey is just beginning. Add more endings to reveal your destiny!'
  };
}
