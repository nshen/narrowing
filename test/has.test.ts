import { has } from '../src/index';

type Fish = { swim: () => {} };
type Bird = { fly: () => {}; mm: 123 };
type Cat = { run: () => {}; meow: () => {} };
type Dog = { run: () => {} };

let pet = {} as any;

const isBird = has<Bird>('fly');
const isDogOrCat = has<Dog | Cat>('run');
const isCat = has<Cat>('run', 'meow');

if (isBird(pet)) {
  pet.fly();
}

if (isDogOrCat(pet)) {
  pet.run();
}

if (isCat(pet)) {
  pet.meow();
}

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
