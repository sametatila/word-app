/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Duman testi: kök ağaç (tema + oturum + navigasyon + ilk ekran) hatasız
// kuruluyor mu. act async: açılıştaki oturum/AsyncStorage okumaları bitsin ki
// ekran kararı verilsin, yoksa yalnız boş zemin çizilir.
test('kök ağaç hatasız render ediliyor', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(<App />);
  });
  expect(tree!.toJSON()).toBeTruthy();
  await ReactTestRenderer.act(async () => {
    tree!.unmount();
  });
});
