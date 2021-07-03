// import React from 'react';
// import { useAppDispatch, useAppSelector } from '../app/hooks';
// import {
//   increment,
//   decrement,
//   incrementByAmount,
// } from '../features/counter/counter-slice';
// import './Counter.scss';

// function Counter(): JSX.Element {
//   const count = useAppSelector((state) => state.counter.value);
//   const dispatch = useAppDispatch();

//   function handleInk() {
//     dispatch(increment());
//   }

//   function handleDec() {
//     dispatch(decrement());
//   }

//   function handleAmountAdded() {
//     dispatch(incrementByAmount(3));
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           <button type="button" onClick={handleInk}>
//             INC. count is: {count}
//           </button>
//           <button type="button" onClick={handleDec}>
//             DEC. count is: {count}
//           </button>
//           <button type="button" onClick={handleAmountAdded}>
//             AmountAdded. count is: {count}
//           </button>
//         </p>
//       </header>
//     </div>
//   );
// }

// export default Counter;
