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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { useDropzone } from 'react-dropzone';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CloseIcon from '@mui/icons-material/Close';
import { autocompleteClasses, Autocomplete } from '@mui/material/Autocomplete';
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
const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};
export default function VoucherCreate() {
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
        <Grid xs={12} sx={{ mb: 2 }}>
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
                title="Create Voucher"
                titleTypographyProps={{ variant: 'h3' }}
                action={
                  <Grid container direction="row">
                    <Grid item>
                      <Button variant="outlined" sx={{ m: 1, marginTop: 2 }}>
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" sx={{ m: 1, marginTop: 2 }}>
                        Make you voucher live
                      </Button>
                    </Grid>
                  </Grid>
                }
              />
            </Card>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ mb: -12 }}>
          <Box
            sx={{
              display: 'grid',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 2,
                width: '100%',
                height: '90%',
                spacing: 2,
              },
            }}
          >
            <Card elevation={24}>
              <CardMedia
                component="img"
                height="100%"
                image="/static/mock-images/covers/cover_02.jpg"
                alt="Paella dish"
              />
            </Card>
          </Box>
        </Grid>
        <Grid container xs={12} spacing={3}>
          <Grid item xs={8}>
            <Grid container direction="column" justifyContent="flex-start">
              <Grid item>
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
                      pt: 0,
                    },
                  }}
                >
                  <Card elevation={24}>
                    <CardHeader title="Voucher Details" titleTypographyProps={{ variant: 'h4' }} />
                    <CardContent>
                      <Grid container direction="column" justifyContent="flex-start" columns={{ md: 12 }}>
                        <Grid item md={12} sx={{ pl: 1 }}>
                          <Typography sx={{ fontWeight: 'bold', pl: 1 }}>Voucher Title</Typography>
                        </Grid>
                        <Grid item sx={{ m: 1, pl: 1, pr: 1 }}>
                          <OutlinedInput placeholder="Please enter text" sx={{ width: '100%', height: 50 }} />
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          columns={{ md: 12 }}
                          sx={{ m: 1 }}
                        >
                          <Grid item md={6}>
                            <Grid container direction="column" justifyContent="flex-start">
                              <Grid item>
                                <Typography sx={{ fontWeight: 'bold', pl: 1 }}>Effective date</Typography>
                              </Grid>
                              <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DatePicker
                                    placeholder="Effective Date"
                                    value={effectiveDate}
                                    onChange={(newValue) => {
                                      setEffectiveDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} sx={{ width: '100%', p: 1, height: 40 }} />
                                    )}
                                    sx={{ width: 1000 }}
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container justifyContent="flex-end" alignItems="center" md={6}>
                            <Grid container direction="column" justifyContent="flex-start">
                              <Grid item>
                                <Typography sx={{ fontWeight: 'bold', pl: 1 }}>Effective Time</Typography>
                              </Grid>
                              <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <TimePicker
                                    value={effectiveTime}
                                    onChange={(newValue) => {
                                      setEffectiveTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} sx={{ width: '100%', p: 1, height: 40 }} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          columns={{ md: 12 }}
                          sx={{ m: 1, mt: 3 }}
                        >
                          <Grid item md={6}>
                            <Grid container direction="column" justifyContent="flex-start">
                              <Grid item>
                                <Typography sx={{ fontWeight: 'bold', pl: 1 }}>Expiration date</Typography>
                              </Grid>
                              <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDateFns} md={12}>
                                  <DatePicker
                                    value={expirationDate}
                                    onChange={(newValue) => {
                                      setExpirationDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} sx={{ width: '100%', p: 1, height: 40 }} />
                                    )}
                                    sx={{ width: 1000 }}
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container justifyContent="flex-end" alignItems="center" md={6}>
                            <Grid container direction="column" justifyContent="flex-start">
                              <Grid item>
                                <Typography sx={{ fontWeight: 'bold', pl: 1 }}>Expiration Time</Typography>
                              </Grid>
                              <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <TimePicker
                                    value={expirationTime}
                                    onChange={(newValue) => {
                                      setExpirationTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} sx={{ width: '100%', p: 1, height: 40 }} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          columns={{ md: 12 }}
                          sx={{ m: 1, mt: 3, mb: 5 }}
                        >
                          <Grid item md={6}>
                            <Grid container direction="column" justifyContent="flex-start">
                              <Grid item>
                                <Typography sx={{ fontWeight: 'bold', pl: 1 }}>Reg. deadline date</Typography>
                              </Grid>
                              <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDateFns} md={12}>
                                  <DatePicker
                                    value={registrationDeadlineDate}
                                    onChange={(newValue) => {
                                      setRegistrationDeadlineDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} sx={{ width: '100%', p: 1, height: 40 }} />
                                    )}
                                    sx={{ width: 1000 }}
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container justifyContent="flex-end" alignItems="center" md={6}>
                            <Grid container direction="column" justifyContent="flex-start">
                              <Grid item>
                                <Typography sx={{ fontWeight: 'bold', pl: 1 }}>Reg. deadline time</Typography>
                              </Grid>
                              <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <TimePicker
                                    value={registrationDeadlineTime}
                                    onChange={(newValue) => {
                                      setRegistrationDeadlineTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} sx={{ width: '100%', p: 1, height: 40 }} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={12}>
                          <Typography sx={{ fontWeight: 'bold', pl: 2 }}>Description</Typography>
                        </Grid>
                        <Grid item sx={{ pl: 2, pr: 2, mb: 5 }}>
                          <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            style={{ width: '100%', outline: 'none' }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              <Grid item>
                <Box
                  sx={{
                    display: 'grid',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 2,
                      mt: -4,
                      width: '100%',
                      height: '100%',
                      p: 2,
                      pt: 0,
                    },
                  }}
                >
                  <Card>
                    <CardHeader title="Voucher Value" titleTypographyProps={{ variant: 'h4' }} />
                    <CardContent>
                      <Grid container direction="column" justifyContent="flex-start">
                        <Grid container direction="row" justtifyContent="flex-start">
                          <Grid item>
                            <Button variant="contained" sx={{ mr: 2 }}>
                              Voucher
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant="contained" checked>
                              Coupon
                            </Button>
                          </Grid>
                        </Grid>
                        <Divider sx={{ mt: 3, mb: 3 }} />
                        <Grid container direction="column">
                          <Grid item>
                            <Grid container direction="row" alignContent="center" columns={{ md: 12 }}>
                              <Grid item md={3}>
                                <Typography sx={{ fontWeight: 'bold', pl: 1, pt: 1 }}>Discount value</Typography>
                              </Grid>
                              <Grid item md={9}>
                                <OutlinedInput
                                  placeholder="Please enter discount value"
                                  sx={{ width: '100%', height: 50 }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container direction="row" alignContent="center" columns={{ md: 12 }}>
                              <Grid item md={3}>
                                <Typography sx={{ fontWeight: 'bold', pl: 1, pt: 1 }}>Voucher Code</Typography>
                              </Grid>
                              <Grid item md={7}>
                                <OutlinedInput
                                  placeholder="Please enter voucher code"
                                  sx={{ width: '100%', height: 50 }}
                                />
                              </Grid>
                              <Grid item md={2}>
                                <Button sx={{ fontSize: 12, ml: 1 }} variant="outlined">
                                  <AddIcon /> Auto generate
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container direction="row" alignContent="center" columns={{ md: 12 }}>
                              <Grid item md={3}>
                                <Typography sx={{ fontWeight: 'bold', pl: 1, pt: 1 }}>QR Code</Typography>
                              </Grid>
                              <Grid item md={9}>
                                <Avatar
                                  alt="Remy Sharp"
                                  src="/static/mock-images/covers/qr.png"
                                  sx={{ width: '50%', height: 300, mt: 2 }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

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
                      p: 2,
                      pt: 0,
                    },
                  }}
                >
                  <Card>
                    <CardHeader title="Upload Photo" titleTypographyProps={{ variant: 'h4' }} />
                    <CardContent>
                      <Grid container direction="column">
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignContent="center"
                          sx={{ border: '1px solid grey', height: 200, bgcolor: 'grey', mb: 3 }}
                        >
                          <Grid item>
                            <div {...drop.getRootProps()}>
                              <Grid item>
                                <Grid container direction="row">
                                  <Grid item>
                                    <CloudUploadIcon sx={{ fontSize: 30, mr: 2, color: 'grey' }} />
                                  </Grid>
                                  <Grid item>
                                    <input {...drop.getInputProps()} />
                                    {drop.isDragActive ? (
                                      <p>Drop the files here ...</p>
                                    ) : (
                                      <Typography sx={{ fontSize: 20, color: 'GreyText' }}>
                                        Drop your images here
                                      </Typography>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row" alignContent="center">
                            <Grid item>
                              <Avatar alt="Remy Sharp" src="/static/mock-images/covers/cover_02.jpg" />
                            </Grid>
                            <Grid item>
                              <Grid container direction="column">
                                <Grid item>
                                  <Typography sx={{ fontSize: 15, color: 'text.secondary', ml: 2, fontWeight: 'bold' }}>
                                    cover_02.jpg
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography sx={{ fontSize: 15, color: 'text.secondary', ml: 2 }}>66 KB</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item sx={{ ml: 'auto' }}>
                              <Button color="secondary">
                                <MoreHorizIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

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

                      pt: 0,
                    },
                  }}
                >
                  <Card>
                    <CardHeader
                      title="Nice Job! You're almost done"
                      titleTypographyProps={{ variant: 'h4' }}
                      action={
                        <Grid container direction="row">
                          <Grid item>
                            <Button variant="outlined" sx={{ m: 1, marginTop: 2 }}>
                              Save
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant="contained" sx={{ m: 1, marginTop: 2 }}>
                              Make you voucher live
                            </Button>
                          </Grid>
                        </Grid>
                      }
                    />
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} justifyContent="row-reverse">
            <Box
              sx={{
                display: 'block',
                position: 'sticky',
                zIndex: 5,

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
                <CardHeader title="Other Info" titleTypographyProps={{ variant: 'h4' }} />
                <CardContent>
                  <Grid container direction="column" justifyContent="flex-start">
                    <Grid item>
                      <Typography sx={{ fontWeight: 'bold' }}>Voucher Type</Typography>
                    </Grid>
                    <Grid item sx={{ mb: 3, mt: 2 }}>
                      {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={voucherType}
                        renderInput={(params) => (
                          <TextField {...params} label="Voucher Type" sx={{ width: '100%', mt: 2 }} />
                        )}
                      /> */}
                      <div {...getRootProps()}>
                        <InputWrapper
                          ref={setAnchorEl}
                          className={focused ? 'focused' : ''}
                          sx={{ width: '100%', p: 1, height: 50 }}
                        >
                          {value.map((option, index) => (
                            <StyledTag label={option.title} {...getTagProps({ index })} key={index} />
                          ))}

                          <input {...getInputProps()} />
                        </InputWrapper>
                      </div>
                      {groupedOptions.length > 0 ? (
                        <Listbox {...getListboxProps()}>
                          {groupedOptions.map((option, index) => (
                            <li {...getOptionProps({ option, index })} key={index}>
                              <span>{option.title}</span>
                              <CheckIcon fontSize="small" color="primary" />
                            </li>
                          ))}
                        </Listbox>
                      ) : null}
                    </Grid>

                    <Grid item>
                      <Typography sx={{ fontWeight: 'bold' }}>Tags</Typography>
                    </Grid>
                    <Grid item sx={{ mb: 3, mt: 2 }}>
                      {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={voucherType}
                        renderInput={(params) => (
                          <TextField {...params} label="Voucher Type" sx={{ width: '100%', mt: 2 }} />
                        )}
                      /> */}
                      <div {...tag.getRootProps()}>
                        <InputWrapper
                          ref={tag.setAnchorEl}
                          className={tag.focused ? 'focused' : ''}
                          sx={{ width: '100%', p: 1, height: 50 }}
                        >
                          {tag.value.map((option, index) => (
                            <StyledTag label={option.title} {...tag.getTagProps({ index })} key={index} />
                          ))}

                          <input {...tag.getInputProps()} />
                        </InputWrapper>
                      </div>
                      {tag.groupedOptions.length > 0 ? (
                        <Listbox {...tag.getListboxProps()}>
                          {tag.groupedOptions.map((option, index) => (
                            <li {...tag.getOptionProps({ option, index })} key={index}>
                              <span>{option.title}</span>
                              <CheckIcon fontSize="small" color="primary" />
                            </li>
                          ))}
                        </Listbox>
                      ) : null}
                    </Grid>

                    <Grid item>
                      <Typography sx={{ fontWeight: 'bold' }}>Stores</Typography>
                    </Grid>
                    <Grid item sx={{ mb: 3, mt: 2 }}>
                      {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={voucherType}
                        renderInput={(params) => (
                          <TextField {...params} label="Voucher Type" sx={{ width: '100%', mt: 2 }} />
                        )}
                      /> */}
                      <div {...store.getRootProps()}>
                        <InputWrapper
                          ref={store.setAnchorEl}
                          className={store.focused ? 'focused' : ''}
                          sx={{ width: '100%', p: 1, height: 50 }}
                        >
                          {store.value.map((option, index) => (
                            <StyledTag label={option.title} {...store.getTagProps({ index })} key={index} />
                          ))}

                          <input {...store.getInputProps()} />
                        </InputWrapper>
                      </div>
                      {store.groupedOptions.length > 0 ? (
                        <Listbox {...store.getListboxProps()}>
                          {store.groupedOptions.map((option, index) => (
                            <li {...store.getOptionProps({ option, index })} key={index}>
                              <span>{option.title}</span>
                              <CheckIcon fontSize="small" color="primary" />
                            </li>
                          ))}
                        </Listbox>
                      ) : null}
                    </Grid>
                    <Divider sx={{ mb: 3 }} />
                    <Grid item>
                      <Typography sx={{ fontWeight: 'bold' }}>List privacy</Typography>
                    </Grid>
                    <Grid item sx={{ mt: 2 }}>
                      <RadioGroup name="use-radio-group" defaultValue="first">
                        <MyFormControlLabel
                          value="first"
                          label={
                            <div>
                              <Typography sx={{ fontWeight: 'bold', color: 'CaptionText' }}>Public page</Typography>
                              <Typography sx={{ fontSize: 15, fontStyle: 'italic', color: 'GrayText' }}>
                                Discoverable by anyone on Voucher Tap, our distribution partners, and search engines.
                              </Typography>
                            </div>
                          }
                          control={<Radio />}
                          sx={{ mb: 2 }}
                        />
                        <MyFormControlLabel
                          value="second"
                          label={
                            <div>
                              <Typography sx={{ fontWeight: 'bold', color: 'CaptionText' }}>Private page</Typography>
                              <Typography sx={{ fontSize: 15, fontStyle: 'italic', color: 'GrayText' }}>
                                Accessible only by people you specify.
                              </Typography>
                            </div>
                          }
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Grid>
                    <Divider sx={{ mt: 3, mb: 3 }} />
                    <Grid item>
                      <Typography sx={{ fontWeight: 'bold' }}>Remaining Vouchers</Typography>
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label={<Typography>Show the number of remaing vouchers</Typography>}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* <ProductList products={FOODS} /> */}
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
