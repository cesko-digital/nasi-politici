import * as React from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsGantt from 'highcharts/modules/gantt'
import NoData from 'components/emptyStates/noData/noData'

highchartsGantt(Highcharts)

interface Props {
  connections: Array<{
    company: string
    ico: string
    since: string
    until: string | null
    description: string
  }>
}

const Chart: React.FC<Props> = props => {
  // const categories = props.connections.map(c => c.company + ' - ' + c.description)

  const data = props.connections.map((c, i) => {
    const since = new Date(c.since + '.000Z')
    const until = c.until ? new Date(c.until + '.000Z') : new Date()
    return {
      start: since.getTime(),
      end: until.getTime(),
      name: c.company + ' - ' + c.description,
      // parent: c.company,
    }
  })
  const options = {
    title: {
      text: '',
    },
    yAxis: {
      title: {
        text: '',
      },
      // categories,
      reversed: true,
    },
    xAxis: [
      {
        tickInterval: 1000 * 60 * 60 * 24 * 365, // Year
        labels: {
          format: '{value:%Y}',
          style: {
            fontSize: '15px',
          },
        },
        linkedTo: 0,
      },
    ],
    series: [
      {
        name: '',
        borderColor: 'gray',
        pointWidth: 20,
        data,
        dataLabels: {
          enabled: true,
        },
      },
    ],
  }
  if (!props.connections.length) return <NoData />
  return <HighchartsReact highcharts={Highcharts} options={options} constructorType="ganttChart" />
}

export default Chart
