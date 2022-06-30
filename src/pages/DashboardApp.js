import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
  CardMedia,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Label from '../components/Label';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import FOODS from '../_mock/foods';
import user from '../_mock/user';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3} columns={{ lg: 12 }}>
          <Grid item lg={12}>
            <Grid container direction="row" sx={{ mb: 3 }}>
              <Grid item>
                <Typography sx={{ color: 'text.disabled', fontWeight: 500, fontSize: 50 }}>Welcome, </Typography>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <Typography sx={{ fontSize: 50, fontWeight: 500 }}>Frankie</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column" lg={8} spacing={4}>
            <Grid item>
              <Grid container direction="row" justifyContent="flex-start" alighCenter="center" columns={{ lg: 12 }}>
                <Grid container direction="column" justifyContent="center" alignItems="center" lg={3}>
                  <Card sx={{ bgcolor: '#fef5e8', width: 200, height: 200 }}>
                    <CardHeader action={<ArrowUpwardIcon sx={{ color: '#F7a642' }} />} />
                    <CardContent>
                      <Grid container direction="column">
                        <Grid container justifyContent="center" alignContent="center">
                          <Typography sx={{ color: '#F7a642', mt: -5, fontSize: 40, fontWeight: 600 }}>4%</Typography>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignContent="center"
                          column={{ lg: 12 }}
                          sx={{ mt: 1 }}
                        >
                          <Grid container direction="column" justifyContent="flex-start" lg={6}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ bgcolor: '#fff', width: 65, height: 60, borderRadius: 2 }}
                            >
                              <Typography sx={{ fontWeight: 500, fontSize: 20 }}>31</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Vouchers</Typography>
                            </Box>
                          </Grid>
                          <Grid container justifyContent="flex-end" lg={6}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ bgcolor: '#fff', width: 65, height: 60, borderRadius: 2 }}
                            >
                              <Typography sx={{ fontWeight: 500, fontSize: 20 }}>101</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1, mr: 1.5 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Users</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid item>
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2, mr: 1.5 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 14 }}>District 1</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container direction="column" justifyContent="center" alignItems="center" lg={3}>
                  <Card sx={{ bgcolor: '#fef5e8', width: 200, height: 200 }}>
                    <CardHeader action={<ArrowUpwardIcon sx={{ color: '#F7a642' }} />} />
                    <CardContent>
                      <Grid container direction="column">
                        <Grid container justifyContent="center" alignContent="center">
                          <Typography sx={{ color: '#F7a642', mt: -5, fontSize: 40, fontWeight: 600 }}>25%</Typography>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignContent="center"
                          column={{ lg: 12 }}
                          sx={{ mt: 1 }}
                        >
                          <Grid container direction="column" justifyContent="flex-start" lg={6}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ bgcolor: '#fff', width: 65, height: 60, borderRadius: 2 }}
                            >
                              <Typography sx={{ fontWeight: 500, fontSize: 20 }}>31</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Vouchers</Typography>
                            </Box>
                          </Grid>
                          <Grid container justifyContent="flex-end" lg={6}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ bgcolor: '#fff', width: 65, height: 60, borderRadius: 2 }}
                            >
                              <Typography sx={{ fontWeight: 500, fontSize: 20 }}>101</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1, mr: 1.5 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Users</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid item>
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2, mr: 1.5 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 14 }}>Disctrict 2</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container direction="column" justifyContent="center" alignItems="center" lg={3}>
                  <Card sx={{ bgcolor: '#f5ecff', width: 200, height: 200 }}>
                    <CardHeader action={<ArrowDownwardIcon sx={{ color: '#9a54dc' }} />} />
                    <CardContent>
                      <Grid container direction="column">
                        <Grid container justifyContent="center" alignContent="center">
                          <Typography sx={{ color: '#9a54dc', mt: -5, fontSize: 40, fontWeight: 600 }}>11%</Typography>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignContent="center"
                          column={{ lg: 12 }}
                          sx={{ mt: 1 }}
                        >
                          <Grid container direction="column" justifyContent="flex-start" lg={6}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ bgcolor: '#fff', width: 65, height: 60, borderRadius: 2 }}
                            >
                              <Typography sx={{ fontWeight: 500, fontSize: 20 }}>31</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Vouchers</Typography>
                            </Box>
                          </Grid>
                          <Grid container justifyContent="flex-end" lg={6}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ bgcolor: '#fff', width: 65, height: 60, borderRadius: 2 }}
                            >
                              <Typography sx={{ fontWeight: 500, fontSize: 20 }}>101</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1, mr: 1.5 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Users</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid item>
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2, mr: 1.5 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 14 }}>District 3</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container direction="column" justifyContent="center" alignItems="center" lg={3} sx={{ mb: 4 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: 200, height: 200, border: '2px dashed grey', borderRadius: 3 }}
                  >
                    <Grid container direction="column" justifyContent="center" alignContent="center">
                      <Grid item sx={{ m: '0 auto' }}>
                        <AddIcon sx={{ fontSize: 30, color: 'grey' }} />
                      </Grid>
                      <Grid item>
                        <Typography>Add new store</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <AppWebsiteVisits
                title="Stores Visits"
                subheader="(+43%) than last month"
                chartLabels={[
                  '06/01/2022',
                  '06/02/2022',
                  '06/03/2022',
                  '06/04/2022',
                  '06/05/2022',
                  '06/06/2022',
                  '06/07/2022',
                  '06/08/2022',
                  '06/09/2022',
                  '06/10/2022',
                  '06/11/2022',
                ]}
                chartData={[
                  {
                    name: 'Disctrict 1',
                    type: 'line',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Disctrict 2',
                    type: 'line',
                    fill: 'solid',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Disctrict 3',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            </Grid>

            <Grid item>
              <AppNewsUpdate
                title="News Update"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: FOODS[index + 1].name,
                  description: faker.name.jobTitle(),
                  image: `/static/mock-images/foods/foods_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
            </Grid>

            <Grid item>
              <AppTasks
                title="Tasks"
                list={[
                  { id: '1', label: 'Add today voucher' },
                  { id: '2', label: 'Has a meeting with manager at 3PM' },
                  { id: '3', label: 'Stakeholder Meeting' },
                  { id: '4', label: 'Scoping & Estimations' },
                  { id: '5', label: 'Sprint Showcase' },
                ]}
              />
            </Grid>
          </Grid>

          <Grid container direction="column" lg={4} spacing={4} sx={{ ml: 1 }}>
            <Grid item>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ borderRadius: 3, border: '1px solid grey', p: 2 }}
              >
                <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                  <Grid item sx={{ m: 2 }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image="/static/mock-images/stores/store_2.jpg"
                      alt="Paella dish"
                      sx={{ borderRadius: 3 }}
                    />
                  </Grid>
                  <Grid container direction="row">
                    <Grid item sx={{ mr: 'auto', ml: 2 }}>
                      <Typography sx={{ fontWeight: 'bold', fontSize: 22 }}>Booking list</Typography>
                    </Grid>
                    <Grid item sx={{ ml: 'auto', mr: 2, mb: 4 }}>
                      <MoreHorizIcon />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center" columns={{ lg: 12 }}>
                    <Grid item sx={{ ml: 2 }} lg={1}>
                      <Avatar src="/static/mock-images/avatars/avatar_4.jpg" />
                    </Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" lg={7}>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Wade Warren</Typography>
                      </Grid>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography lg={6} sx={{ fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          #VOU1
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item lg={3}>
                      <Grid container direction="column" justtifyContent="flex-end">
                        <Typography sx={{ ml: 'auto', fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          01.12.2022
                        </Typography>
                        <Label variant="ghost" color="success" sx={{ borderRadius: 3 }}>
                          Available
                        </Label>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ width: '100%' }}>
                    <Divider sx={{ width: '92%', m: 2 }} />
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center" columns={{ lg: 12 }}>
                    <Grid item sx={{ ml: 2 }} lg={1}>
                      <Avatar src="/static/mock-images/avatars/avatar_5.jpg" />
                    </Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" lg={7}>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Jacob Jones</Typography>
                      </Grid>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography lg={6} sx={{ fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          #VOU2
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item lg={3}>
                      <Grid container direction="column" justtifyContent="flex-end">
                        <Typography sx={{ ml: 'auto', fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          01.12.2022
                        </Typography>
                        <Label variant="ghost" color="error" sx={{ borderRadius: 3 }}>
                          Redeemed
                        </Label>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ width: '100%' }}>
                    <Divider sx={{ width: '92%', m: 2 }} />
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center" columns={{ lg: 12 }}>
                    <Grid item sx={{ ml: 2 }} lg={1}>
                      <Avatar src="/static/mock-images/avatars/avatar_6.jpg" />
                    </Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" lg={7}>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Kathryn Murphy</Typography>
                      </Grid>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography lg={6} sx={{ fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          #VOU2
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item lg={3}>
                      <Grid container direction="column" justtifyContent="flex-end">
                        <Typography sx={{ ml: 'auto', fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          01.12.2022
                        </Typography>
                        <Label variant="ghost" color="warning" sx={{ borderRadius: 3 }}>
                          Pending
                        </Label>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ width: '100%' }}>
                    <Divider sx={{ width: '92%', m: 2 }} />
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center" columns={{ lg: 12 }}>
                    <Grid item sx={{ ml: 2 }} lg={1}>
                      <Avatar src="/static/mock-images/avatars/avatar_8.jpg" />
                    </Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" lg={7}>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Wade Johnny</Typography>
                      </Grid>
                      <Grid item sx={{ ml: 3, mr: 'auto' }}>
                        <Typography lg={6} sx={{ fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          #VOU1
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item lg={3}>
                      <Grid container direction="column" justtifyContent="flex-end">
                        <Typography sx={{ ml: 'auto', fontWeight: 500, fontSize: 15, color: 'text.disabled' }}>
                          01.12.2022
                        </Typography>
                        <Label variant="ghost" color="success" sx={{ borderRadius: 3 }}>
                          Available
                        </Label>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" sx={{ color: 'primary', borderRadius: 3, m: 3, mt: 5 }}>
                      <Typography>View all</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <AppCurrentVisits
                title="Vouchers"
                subheader="This year"
                chartData={[
                  { label: 'Disctrict 1', value: 4344 },
                  { label: 'Disctrict 2', value: 5435 },
                  { label: 'Disctrict 3', value: 1443 },
                  { label: 'Disctrict 4', value: 4443 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.chart.blue[0],
                  theme.palette.chart.violet[0],
                  theme.palette.chart.yellow[0],
                ]}
              />
            </Grid>

            <Grid item>
              <AppOrderTimeline
                title="Voucher Timeline"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: [
                    '2022, vouchers, $4220',
                    '12 Vouchers have been created',
                    'Voucher #37745 from September',
                    'New voucher redeemed #XF-2356',
                    'New voucher created #XF-2346',
                  ][index],
                  type: `order${index + 1}`,
                  time: faker.date.past(),
                }))}
              />
            </Grid>

            <Grid item>
              <AppTrafficBySite
                title="Traffic by Site"
                list={[
                  {
                    name: 'FaceBook',
                    value: 323234,
                    icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                  },
                  {
                    name: 'Google',
                    value: 341212,
                    icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                  },
                  {
                    name: 'Linkedin',
                    value: 411213,
                    icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                  },
                  {
                    name: 'Twitter',
                    value: 443232,
                    icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
