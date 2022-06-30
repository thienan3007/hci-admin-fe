import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RedeemIcon from '@mui/icons-material/Redeem';
import Divider from '@mui/material/Divider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import 'react-circular-progressbar/dist/styles.css';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import FOODS from '../_mock/foods';

// ----------------------------------------------------------------------

export default function Vouchers() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const styles = (theme) => ({
    actions: {
      display: 'flex',
    },
    expand: {
      marginLeft: 'auto',
    },
  });

  const classes = styles();

  const percentage = 70;

  return (
    <Page title="Dashboard: Vouchers">
      <Container sx={{ minWidth: 1550, marginRight: 4 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Vouchers
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}
        <Grid xs={12}>
          <Box
            sx={{
              display: 'grid',
              flexWrap: 'wrap',

              '& > :not(style)': {
                m: 2,
                width: '100%',
                height: 1000,
              },
            }}
          >
            <Card>
              <CardHeader
                action={
                  <Grid container direction="row" sx={{ mt: 2 }}>
                    <Grid item>
                      <Button variant="outlined" sx={{ m: 2, fontSize: 15 }}>
                        DISCOUNT
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" sx={{ m: 2, fontSize: 15, mr: 10 }}>
                        GIFT
                      </Button>
                    </Grid>
                  </Grid>
                }
              />
              <CardContent>
                <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item>
                      <Button color="info" sx={{ fontSize: 15, mr: 3 }} variant="outlined">
                        Export CSV
                      </Button>
                    </Grid>
                    <Grid item>
                      <Divider orientation="vertical" />
                    </Grid>
                    <Grid item>
                      <Button color="info" sx={{ fontSize: 15 }} variant="outlined">
                        Import CSV
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontSize: 30, m: 5 }}>|</Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontSize: 25, fontWeight: 'bold', color: 'orange' }}>44/50</Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontSize: 20, fontStyle: 'italic', ml: 2 }}>Voucher remaining</Typography>
                    </Grid>
                    <Grid item sx={{ marginLeft: 'auto' }}>
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        variant="standard"
                        sx={{ fontSize: 20 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions />
            </Card>
          </Box>
        </Grid>

        {/* <ProductList products={FOODS} /> */}
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
