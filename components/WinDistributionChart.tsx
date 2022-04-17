import React, {FunctionComponent} from 'react';
import styles from '../styles/WinDistributionChart.module.css';

type WinDistributionProp = {
  wins_1_turn: number,
  wins_2_turn: number,
  wins_3_turn: number,
  wins_4_turn: number,
  wins_5_turn: number,
  wins_6_turn: number,
}

const WinDistributionChart: FunctionComponent<WinDistributionProp> =
  (props) => {
    const max = Math.max(
        props.wins_1_turn,
        props.wins_2_turn,
        props.wins_3_turn,
        props.wins_4_turn,
        props.wins_5_turn,
        props.wins_6_turn,
    ) || 1;
    const distributionStyles = {
      1: {width: (props.wins_1_turn / max) * 100 + '%'},
      2: {width: (props.wins_2_turn / max) * 100 + '%'},
      3: {width: (props.wins_3_turn / max) * 100 + '%'},
      4: {width: (props.wins_4_turn / max) * 100 + '%'},
      5: {width: (props.wins_5_turn / max) * 100 + '%'},
      6: {width: (props.wins_6_turn / max) * 100 + '%'},
    };
    const distributionTitles = {
      1: props.wins_1_turn + ' wins',
      2: props.wins_2_turn + ' wins',
      3: props.wins_3_turn + ' wins',
      4: props.wins_4_turn + ' wins',
      5: props.wins_5_turn + ' wins',
      6: props.wins_6_turn + ' wins',
    };

    return <div className={styles.container}>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['1']}
        title={distributionTitles['1']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['2']}
        title={distributionTitles['2']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['3']}
        title={distributionTitles['3']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['4']}
        title={distributionTitles['4']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['5']}
        title={distributionTitles['5']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['6']}
        title={distributionTitles['6']}></div>
    </div>;
  };

export default WinDistributionChart;
