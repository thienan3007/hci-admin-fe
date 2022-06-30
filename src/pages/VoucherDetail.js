import { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import RedeemIcon from '@mui/icons-material/Redeem';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import 'react-circular-progressbar/dist/styles.css';
// components
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import FOODS from '../_mock/foods';

// material

// components

import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'takeBy', label: 'Taken by', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'takeDate', label: 'Take Date', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'endTime', label: 'End Time', alignRight: false },
  { id: 'startTime', label: 'Start Time', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
// ----------------------------------------------------------------------

export default function VoucherDetail() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
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
          Voucher Detail
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
                height: '90%',
                spacing: 2,
                p: 2,
              },
            }}
          >
            <Card>
              <CardHeader
                title="Margarita"
                titleTypographyProps={{ variant: 'h2' }}
                subheader={
                  <div>
                    <IconButton aria-label="Add" sx={{ m: 1, marginTop: 2 }}>
                      <AddIcon color="black" />
                    </IconButton>
                    <Button variant="contained" sx={{ m: 1, marginTop: 2 }}>
                      Food
                    </Button>
                    <Button variant="contained" sx={{ m: 1, marginTop: 2 }}>
                      Drink
                    </Button>
                    <Button variant="contained" sx={{ m: 1, marginTop: 2 }}>
                      Coffee
                    </Button>
                    <Button variant="contained" sx={{ m: 1, marginTop: 2 }}>
                      ...
                    </Button>
                  </div>
                }
                action={
                  <Grid container direction="row">
                    <Grid item>
                      <Typography>VOUCHER</Typography>
                    </Grid>
                    <Grid item>
                      <RedeemIcon color="primary" sx={{ ml: 2, mr: 2 }} />
                    </Grid>
                  </Grid>
                }
              />
              <CardContent className={classes.actions}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                  <Grid item>
                    <RedeemIcon className={classes.expand} color="primary" sx={{ fontSize: 40, marginRight: 3 }} />
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: 15 }} className="float-right" gutterBottom>
                      Voucher was created at
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} variant="body2" color="text.secondary" gutterBottom>
                      Jan 12, 11:13PM
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions />
            </Card>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box
            sx={{
              display: 'grid',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 2,
                width: '100%',
                height: '90%',
                spacing: 2,
                p: 2,
              },
            }}
          >
            <Card elevation={24}>
              <CardHeader
                title="Detail"
                titleTypographyProps={{ variant: 'h4' }}
                action={
                  <Button variant="contained" color="primary" sx={{ m: 1 }}>
                    <EditIcon /> Update detail
                  </Button>
                }
                style={{ backgroundColor: 'primary' }}
              />
              <CardContent>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ md: 12 }}>
                  <Grid item md={4}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Type</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Discount</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Effective Date</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ fontStyle: 'italic', mb: 2 }}>07/30/2022</Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Expiration Date</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ fontStyle: 'italic', mb: 2 }}>08/30/2022</Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Redeemable</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Yes</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} sm={4} md={3} />
                  <Grid item xs={2} sm={4} md={5}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Discount Value</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ mb: 2 }}>50%</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Status</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ fontStyle: 'italic', mb: 2 }}>In stock</Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Description</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ fontStyle: 'italic', mb: 2 }}>In stock</Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        columns={{ md: 12 }}
                      >
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold' }}>Voucher Code</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography sx={{ fontWeight: 'bold' }}>eyJkIjoiSFMyNTYiLCJ0eXAiOi</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container justifyContent="flex-end" direction="row" alignItems="center" sx={{ mb: 2 }}>
                  <Grid item>
                    <Button variant="contained" color="warning" sx={{ mr: 2 }}>
                      <EditIcon /> Save changes
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid container xs={12} spacing={3}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'grid',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 2,
                  width: '100%',
                  height: '90%',
                  spacing: 2,
                  p: 2,
                },
              }}
            >
              <Card elevation={24}>
                <CardHeader
                  title="Store list"
                  titleTypographyProps={{ variant: 'h4' }}
                  action={
                    <Button variant="contained" color="primary" sx={{ m: 2 }}>
                      <AddIcon />
                    </Button>
                  }
                />
                <CardContent>
                  <Grid container direction="column" justifyContent="flex-start">
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      columns={{ md: 12 }}
                    >
                      <Grid item md={6}>
                        <Typography sx={{ fontWeight: 'bold' }}>Saigon, district 1</Typography>
                      </Grid>
                      <Grid container justifyContent="flex-end" alignItems="center" md={6}>
                        <Grid item>
                          <Typography sx={{ color: 'warning' }}>
                            Available
                            <Button>
                              <MoreHorizIcon color="warning" />
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      columns={{ md: 12 }}
                    >
                      <Grid item md={6}>
                        <Typography sx={{ fontWeight: 'bold' }}>Saigon, district 1</Typography>
                      </Grid>
                      <Grid container justifyContent="flex-end" alignItems="center" md={6}>
                        <Grid item>
                          <Typography sx={{ color: 'warning' }}>
                            Available
                            <Button>
                              <MoreHorizIcon color="warning" />
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      columns={{ md: 12 }}
                    >
                      <Grid item md={6}>
                        <Typography sx={{ fontWeight: 'bold' }}>Saigon, district 1</Typography>
                      </Grid>
                      <Grid container justifyContent="flex-end" alignItems="center" md={6}>
                        <Grid item>
                          <Typography sx={{ color: 'warning' }}>
                            Available
                            <Button>
                              <MoreHorizIcon color="warning" />
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      columns={{ md: 12 }}
                    >
                      <Grid item md={6}>
                        <Typography sx={{ fontWeight: 'bold' }}>Saigon, district 1</Typography>
                      </Grid>
                      <Grid container justifyContent="flex-end" alignItems="center" md={6}>
                        <Grid item>
                          <Typography sx={{ color: 'disabled' }} color="theme.palette.text.disabled">
                            Deactivated
                            <Button>
                              <MoreHorizIcon color="disabled" />
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={6} justifyContent="row-reverse">
            <Box
              sx={{
                display: 'grid',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 2,
                  width: '100%',
                  height: '90%',
                  spacing: 2,
                  p: 2,
                },
              }}
            >
              <Card elevation={24}>
                <CardContent>
                  <Grid container direction="row" columns={{ md: 12 }} sx={{ mt: 1 }}>
                    <Grid container direction="column" justifyContent="flex-start" md={6}>
                      <Grid item>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>New Users</Typography>
                      </Grid>
                      <Grid container direction="row" alignContent="flex-end">
                        <Grid item>
                          <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>252</Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontSize: 20, ml: 2, mt: 3, fontStyle: 'italic' }}>Registered</Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" alignContent="flex-end">
                        <Grid item>
                          <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>350</Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontSize: 20, ml: 2, mt: 3, fontStyle: 'italic' }}>In stock</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end" alignContent="flex-start" md={6}>
                      <div style={{ width: 150, height: 150 }}>
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',

                            // Text size
                            textSize: '16px',

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            pathColor: 'blue',
                            textColor: '#000',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                          })}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Box
            sx={{
              display: 'grid',
              flexWrap: 'wrap',

              '& > :not(style)': {
                m: 2,
                width: '100%',
                height: '90%',
                spacing: 2,
                p: 2,
              },
            }}
          >
            <Card>
              <CardHeader
                title="User List"
                titleTypographyProps={{ variatn: 'h1' }}
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
                  </Grid>
                </Grid>
                <UserListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={USERLIST.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const {
                            id,
                            takeBy,
                            role,
                            takeDate,
                            status,
                            endTime,
                            startTime,
                            company,
                            avatarUrl,
                            isVerified,
                          } = row;
                          const isItemSelected = selected.indexOf(takeBy) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, takeBy)} />
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={takeBy} src={avatarUrl} />
                                  <Typography variant="subtitle2" noWrap>
                                    {takeBy}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{company}</TableCell>
                              <TableCell align="left">{role}</TableCell>
                              <TableCell align="left">{takeDate}</TableCell>
                              <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                              <TableCell align="left">
                                <Label variant="ghost" color={(status === 'Redeemed' && 'error') || 'success'}>
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>
                              <TableCell align="left">{endTime}</TableCell>
                              <TableCell align="left">{startTime}</TableCell>
                              <TableCell align="right">
                                <UserMoreMenu />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>

                      {isUserNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              <SearchNotFound searchQuery={filterName} />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={USERLIST.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
