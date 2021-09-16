type Fish = { swim: () => {} };
type Bird = { fly: () => {}; mm: 123 };

import { has } from '../src/index';

test('has', () => {
  function getPet(): any {
    return { fly: () => {} } as any;
  }
  let pet: Fish | Bird = getPet();

  const isBird = has<Bird>('fly', 'mm');
  const isFish = has('swim');

  if (isBird(pet)) {
    pet.fly();
  }
  if (isFish(pet)) {
    pet.swim();
  }

  // no mm property
  expect(isBird(pet)).toBe(false);
  expect(isFish(pet)).toBe(false);

  // only check swim property exist
  expect(isFish({ swim: '123' })).toBe(true);
});
