import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CStyles from '../style';
import { BarChart } from 'react-native-chart-kit';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const Statistic = () => {
  // Your statistics data
  const statisticsData = {
    totalDistance: '5,510 m',
    maxSpeed: '50 km/h',
    avgSpeed: '30 km/h',
    distanceData: [630, 650, 180, 600, 320, 160],
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  };

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 40]
      }
    ]
  };
  return (
    <View style={styles.container}>
      <View style={[CStyles.w95,CStyles.alignItemsStart]}>
        {/* <Text style={styles.title}>Statistics</Text> */}
        <Text style={styles.subtitle}>Last Week</Text>
      </View>
      <View style={[CStyles.shadow3, CStyles.w95, CStyles.p2, CStyles.rounded, CStyles.bgWhite, CStyles.alignItemsCenter]}>
        <Text style={[styles.statValue, CStyles.fs2, CStyles.textAppColor, CStyles.textBold]}>{statisticsData.totalDistance}</Text>
        <Text style={styles.statLabel}>Total Distance</Text>
      </View>
      <View style={[CStyles.w100, CStyles.flexRow, CStyles.justifyContentBetween]}>

        <View style={[CStyles.shadow3, CStyles.w45, CStyles.m1, CStyles.p2, CStyles.rounded, CStyles.bgWhite, CStyles.alignItemsCenter]}>
          <Text style={[styles.statValue, CStyles.fs2, CStyles.textPrimary, CStyles.textBold]}>{statisticsData.maxSpeed}</Text>
          <Text style={styles.statLabel}>Max Speed</Text>
        </View>
        <View style={[CStyles.shadow3, CStyles.w45, CStyles.m1, CStyles.p2, CStyles.rounded, CStyles.bgWhite, CStyles.alignItemsCenter]}>
          <Text style={[styles.statValue, CStyles.fs2, CStyles.textPrimary, CStyles.textBold]}>{statisticsData.avgSpeed}</Text>
          <Text style={styles.statLabel}>Average Speed</Text>
        </View>
      </View>
      <View style={[CStyles.rounded, CStyles.shadow3, CStyles.bgWhite, CStyles.p2, CStyles.justifyContentCenter, CStyles.alignItemsCenter,CStyles.w95]}>
        <Text style={styles.statLabel}>Distance</Text>


        <BarChart
          style={[CStyles.w90, CStyles.alignItemsCenter]}
          data={data}
          // width={Dimensions.get('window').width}
          width={350}
          height={350}
          // yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: 'white',
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: 'white',
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.8,
            useShadowColorFromDataset: false,
          }}
          fromZero={true}
          verticalLabelRotation={0}
        />
        {/* <Text style={styles.subtitle}>Distance by Day</Text>
      {statisticsData.distanceData.map((distance, index) => (
        <View key={index} style={styles.stat}>
        <Text style={styles.statLabel}>{statisticsData.days[index]}</Text>
        <Text style={[styles.statValue]}>{distance} m</Text>
        </View>
      ))} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems:'center',
    marginTop:20

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  stat: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    margin: 10,
    backgroundColor: "#fff",
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontWeight:"bold"
  },
  statValue: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Statistic;