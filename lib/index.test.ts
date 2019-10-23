// import mix from './index';

// test('color to color', () => {
//   expect(mix('#336699', '#f80')).toMatchSnapshot(`mix('#336699', '#f80')`);
//   expect(mix('#336699', '#ff8800')).toMatchSnapshot(`mix('#336699', '#ff8800')`);
//   expect(mix('#336699', 'rgba(255,128,0,1)')).toMatchSnapshot(`mix('#336699', 'rgba(255,128,0,1)')`);
//   expect(mix('#336699', '#f80', 1)).toMatchSnapshot(`mix('#336699', '#f80', 1)`);
//   expect(mix('#336699', '#f80', 0.5)).toMatchSnapshot(`mix('#336699', '#f80', 0.5)`);
//   expect(mix('#336699', '#f80', 0.2)).toMatchSnapshot(`mix('#336699', '#f80', 0.2)`);
//   expect(mix('#336699', '#ff8800', 1)).toMatchSnapshot(`mix('#336699', '#ff8800', 1)`);
//   expect(mix('#336699', '#ff8800', 0.5)).toMatchSnapshot(`mix('#336699', '#ff8800', 0.5)`);
//   expect(mix('#336699', '#ff8800', 0.2)).toMatchSnapshot(`mix('#336699', '#ff8800', 0.2)`);
//   expect(mix('#336699', 'rgb(255,128,0)', 1)).toMatchSnapshot(`mix('#336699', 'rgb(255,128,0)', 1)`);
//   expect(mix('rgb(0,128,0)', 'rgb(255,128,0)', 1)).toMatchSnapshot(`mix('rgb(0,128,0)', 'rgb(255,128,0)', 1)`);
//   expect(mix('#336699', 'rgba(255,128,0,1)', 1)).toMatchSnapshot(`mix('#336699', 'rgba(255,128,0,1)', 1)`);
//   expect(mix('#336699', 'rgba(255,128,0,1)', 0.5)).toMatchSnapshot(`mix('#336699', 'rgba(255,128,0,1)', 0.5)`);
//   expect(mix('#336699', 'rgba(255,128,0,1)', 0.2)).toMatchSnapshot(`mix('#336699', 'rgba(255,128,0,1)', 0.2)`);
// });

// test('alphaColor to alphaColor', () => {
//   expect(mix('#336699', '#ff880000')).toMatchSnapshot(`mix('#336699', '#ff880000')`);
//   expect(mix('#336699', '#ff880000', 0.5)).toMatchSnapshot(`mix('#336699', '#ff880000', 0.5)`);
//   expect(mix('#336699', 'rgba(255,128,0,0.5)', 0.5)).toMatchSnapshot(`mix('#336699', 'rgba(255,128,0,0.5)', 0.5)`);
//   expect(mix('#33669988', '#ff880000')).toMatchSnapshot(`mix('#33669988', '#ff880000')`);
//   expect(mix('#33669988', '#ff880000', 0.5)).toMatchSnapshot(`mix('#33669988', '#ff880000', 0.5)`);
//   expect(mix('#33669988', 'rgba(255,128,0,0.5)', 0.5)).toMatchSnapshot(`mix('#33669988', 'rgba(255,128,0,0.5)', 0.5)`);
//   expect(mix('rgba(255,128,0,1)', 'rgba(255,128,0,3)', 4)).toMatchSnapshot(
//     `mix('rgba(255,128,0,1)', 'rgba(255,128,0,3)', 4)`,
//   );
//   expect(mix('rgba(255,128,0,1)', 'rgba(255,128,0,0.5)', 0.5)).toMatchSnapshot(
//     `mix('rgba(255,128,0,1)', 'rgba(255,128,0,0.5)', 0.5)`,
//   );
//   expect(mix('rgba(255,128,0,1)', 'rgba(128,128,0,0.8)', 0.2)).toMatchSnapshot(
//     `mix('mix('rgba(255,128,0,1)', 'rgba(128,128,0,0.8)', 0.2)`,
//   );
//   expect(mix('rgba(255,128,0,1)', 'rgba(0,128,0,0)', 0.2)).toMatchSnapshot(
//     `mix('rgba(255,128,0,1)', 'rgba(0,128,0,0)', 0.2)`,
//   );
//   expect(mix('rgba(255,128,0,0)', 'rgba(0,128,0,1)', 0.2)).toMatchSnapshot(
//     `mix('rgba(255,128,0,0)', 'rgba(0,128,0,1)', 0.2)`,
//   );
//   expect(mix('rgba(255,128,0,0.5)', 'rgba(0,128,0,0.5)', 1)).toMatchSnapshot(
//     `mix('rgba(255,128,0,0.5)', 'rgba(0,128,0,0.5)', 1)`,
//   );
//   expect(mix('rgba(255,128,0,1)', 'rgba(0,128,0,0.3)', 0.2)).toMatchSnapshot(
//     `mix('rgba(255,128,0,1)', 'rgba(0,128,0,0.3)', 0.2)`,
//   );
//   expect(mix('rgba(255,128,0,5)', 'rgba(0,128,0,0.3)', 1)).toMatchSnapshot(
//     `mix('rgba(255,128,0,1)', 'rgba(0,128,0,0.3)', 0.2)`,
//   );
//   expect(mix('rgba(255,128,0,1)', 'rgba(300,128,0,0.3)', 1)).toMatchSnapshot(
//     `mix('rgba(255,128,0,1)', 'rgba(0,128,0,0.3)', 0.2)`,
//   );
//   expect(mix('rgba(255,128,0,1)', 'rgba(300,128,0,-0.3)', 1)).toMatchSnapshot(
//     `mix('rgba(255,128,0,1)', 'rgba(0,128,0,-0.3)', 0.2)`,
//   );
// });
