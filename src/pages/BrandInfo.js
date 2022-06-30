import { useState, useCallback } from 'react';

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

// import Swiper styles

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import TransgenderIcon from '@mui/icons-material/Transgender';
import ExplicitIcon from '@mui/icons-material/Explicit';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { useDropzone } from 'react-dropzone';
import Slider from 'react-slick';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';

import 'react-circular-progressbar/dist/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// components
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';

import Label from '../components/Label';

import Page from '../components/Page';
// mock
import FOODS from '../_mock/foods';

// material

// components

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';

import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

import ShopProductCard from '../sections/@dashboard/products/ProductCard';
// mock
import STORES from '../_mock/stores';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Namme', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
// const Label = styled('label')`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;
// const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(({ theme, checked }) => ({
//   '.MuiFormControlLabel-label': checked && {
//     color: theme.palette.primary.main,
//   },
// }));
export default function BrandInfo() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [effectiveDate, setEffectiveDate] = useState(null);

  const [expirationDate, setExpirationDate] = useState(null);

  const [registrationDeadlineDate, setRegistrationDeadlineDate] = useState(null);

  const [registrationDeadlineTime, setRegistrationDeadlineTime] = useState(null);

  const [effectiveTime, setEffectiveTime] = useState(null);

  const [expirationTime, setExpirationTime] = useState(null);

  //   slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const voucherType = [{ title: 'Discount' }, { title: 'Coupon' }];

  const tags = [{ title: 'Food' }, { title: 'Drink' }, { title: 'Spa' }, { title: 'Entertainment' }];

  const stores = [{ title: 'District 1' }, { title: 'District 2' }, { title: 'District 3' }, { title: 'District 4' }];

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: voucherType,
    getOptionLabel: (option) => option.title,
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const drop = useDropzone({ onDrop });

  const tag = useAutocomplete({
    id: 'tag',
    multiple: true,
    options: tags,
    getOptionLabel: (option) => option.title,
  });

  const store = useAutocomplete({
    id: 'tag',
    multiple: true,
    options: stores,
    getOptionLabel: (option) => option.title,
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = STORES.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - STORES.length) : 0;

  const filteredUsers = applySortFilter(STORES, getComparator(order, orderBy), filterName);

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
      <Container maxWidth="xl">
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
        <Grid xs={12} sx={{ mb: 2, mr: 3 }}>
          <Box
            sx={{
              display: 'grid',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 2,
                width: '100%',
                height: '90%',
                p: 2,
                pt: 0,
                pb: 0,
              },
            }}
          >
            <Card>
              <CardHeader
                avatar={<Avatar sx={{ width: 100, height: 100 }} src="/static/mock-images/avatars/logo.jpg" />}
                title={
                  <Grid container direction="row">
                    <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Lotte Mart</Typography>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Grid>
                }
                subheader="LM2022"
                titleTypographyProps={{ variant: 'h3' }}
                action={
                  <Grid container direction="row">
                    <Grid item>
                      <Button variant="outlined" sx={{ m: 1, marginTop: 2 }} color="secondary">
                        <LocalPhoneIcon />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" sx={{ m: 1, marginTop: 2 }} color="secondary">
                        <EmailIcon />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" sx={{ m: 1, marginTop: 2 }} color="secondary">
                        <ChatIcon />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" sx={{ m: 1, marginTop: 2 }} color="secondary">
                        <CalendarTodayIcon />
                      </Button>
                    </Grid>
                  </Grid>
                }
              />
            </Card>
          </Box>
        </Grid>

        <Grid container xs={12} spacing={3}>
          <Grid item xs={4}>
            <Grid container direction="column" justifyContent="flex-start">
              <Grid item>
                <Box
                  sx={{
                    display: 'grid',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 2,
                      mt: 0,
                      width: '100%',
                      height: '90%',
                      spacing: 2,
                      p: 2,
                      pt: 0,
                    },
                  }}
                >
                  <Card elevation={24}>
                    <CardHeader title="About this brand" titleTypographyProps={{ variant: 'h5' }} />
                    <CardContent>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <LocalPhoneIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>
                                Phone:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>(629) 555-0123</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <EmailIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>
                                Email:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>lotte@company.io</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <PersonIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>
                                Owner:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>Tom Thien</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <TransgenderIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>
                                Gender:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>Male</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <ExplicitIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>
                                Language:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>Endglish</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <LocationCityIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>City:</Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>Korea</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <HomeIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>
                                Address:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>112, Seoul</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <LocationOnIcon />
                            </Grid>
                            <Grid item>
                              <Typography sx={{ color: 'text.disabled', fontSize: 18, ml: 2, mb: 2 }}>
                                Postcode:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography sx={{ fontSize: 18, ml: 2 }}>01000</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid item>
                          <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 2 }}>Tags</Typography>
                        </Grid>
                        <Grid item sx={{ mb: 5 }}>
                          <Grid container direction="row" alignContent="center">
                            <Grid item>
                              <IconButton aria-label="Add" sx={{ m: 1, marginTop: 2 }}>
                                <AddIcon color="black" />
                              </IconButton>
                              <Button variant="contained" color="error" sx={{ m: 1, marginTop: 2 }}>
                                Food
                              </Button>
                              <Button variant="contained" sx={{ m: 1, marginTop: 2 }}>
                                Drink
                              </Button>
                              <Button variant="contained" sx={{ m: 1, marginTop: 2, bgcolor: '#4E342E' }}>
                                Coffee
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8} justifyContent="row-reverse">
            <Grid container direction="row" alignContent="center">
              <Grid item>
                <Typography sx={{ fontWeight: 700, fontSize: 22, ml: 4, mt: 2 }}>Recent voucher</Typography>
              </Grid>
              <Grid item sx={{ ml: 'auto' }}>
                <Button sx={{ fontWeight: 700, lineHeight: 1.5, fontSize: 15, ml: 4, mt: 2 }}>
                  <AddIcon sx={{ fontSize: 25, mr: 1 }} /> Add Voucher
                </Button>
              </Grid>
            </Grid>

            <Slider {...settings} style={{ border: 'none' }} useCSS>
              {FOODS.map((product) => (
                <Grid key={product.id} item sx={{ m: 2 }}>
                  <ShopProductCard product={product} paramMargin={2} />
                </Grid>
              ))}
            </Slider>
            <Grid container direction="row" alignContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Typography sx={{ fontWeight: 700, fontSize: 22, ml: 4, mt: 2 }}>Store List</Typography>
              </Grid>
              <Grid item sx={{ ml: 'auto' }}>
                <Button sx={{ fontWeight: 700, lineHeight: 1.5, fontSize: 15, ml: 4, mt: 2 }}>
                  <AddIcon sx={{ fontSize: 25, mr: 1 }} /> Add Store
                </Button>
              </Grid>
            </Grid>
            <Grid item sx={{ ml: 4, mt: 2 }}>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={STORES.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, name, address, price, status, cover } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

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
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={cover} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{price}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={(status === 'Closed' && 'error') || 'success'}>
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>
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

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={STORES.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* <ProductList products={FOODS} /> */}
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
