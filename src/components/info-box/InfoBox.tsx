import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useElapsedTime } from 'use-elapsed-time';
import './info-box.scss';

export default function InfoBox({}: any) {
  const numBounces = useSelector((state: RootState) => state.numBounces.value);
  const { elapsedTime: seconds } = useElapsedTime({
    isPlaying: true,
    updateInterval: 1,
  });
  let minutes = 0;

  useEffect(() => {
    minutes = seconds >= 60 ? Math.floor(seconds / 60) : 0;
  }, []);

  return (
    <section className='info-box'>
      <table>
        <thead>
          <tr>
            <th>Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bounces</td>
            <td>{numBounces}</td>
          </tr>
          <tr>
            <td>Time Elapsed</td>
            <td>
              {minutes ? minutes + 'm' : ''}
              {seconds} seconds
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
