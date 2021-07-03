// import React from 'react';
// import { useFetchMoviesQuery } from '../features/movies/movies-api-slice';
// import './Movies.scss';

// function Movies(): JSX.Element {
//   const { data, isFetching } = useFetchMoviesQuery();

//   if (isFetching) {
//     return <div>Fetching data...</div>;
//   }

//   console.log('data', data.total, data.limit, data.data);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>Movies {data.limit}</p>
//         {/* <pre style={{ fontSize: 10 }}>{JSON.stringify(data.data, null, 2)}</pre> */}
//         {data.data.map((movie) => {
//           return (
//             <div key={movie.id}>
//               <div style={{ marginTop: 30 }}>{movie.title}</div>
//               <img
//                 style={{ width: 200 }}
//                 src={movie.poster_path}
//                 alt={movie.title}
//               />
//             </div>
//           );
//         })}
//       </header>
//     </div>
//   );
// }

// export default Movies;
