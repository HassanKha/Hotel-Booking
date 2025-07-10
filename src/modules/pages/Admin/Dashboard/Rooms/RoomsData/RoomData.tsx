import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Button,
  TextField,
  CircularProgress,
  FormHelperText,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { axiosInstance, Facilities_URL, ROOMS_URLS } from '../../../../../services/Urls';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RoomFormData {
  roomNumber: string;
  imgs: FileList | null;
  price: number | null;
  capacity: number | null;
  discount: number | null;
  facilities: number[];
}

interface Facilities {
  name: string;
  _id: number;
}

function RoomData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<Facilities[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const roomToEdit = location.state?.roomToEdit;

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
    reset,
  } = useForm<RoomFormData>({
    defaultValues: {
      roomNumber: '',
      price: null,
      capacity: null,
      discount: null,
      facilities: [],
      imgs: null,
    },
  });


  const watchedFiles: FileList | null = watch('imgs');

  const getFacilities = async () => {
    try {
      const response = await axiosInstance.get(Facilities_URL.GET_facilities);
      setFacilities(response.data.data.facilities);
    } catch (error) {
      toast.error('Failed to fetch facilities.');
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  useEffect(() => {
    if (roomToEdit && facilities.length > 0) {
      const facilityIds = roomToEdit.category
        ?.split(',')
        .map((name: string) => {
          const found = facilities.find((f) => f.name.trim() === name.trim());
          return found?._id ?? null;
        })
        .filter((id) => id !== null) as number[];

      reset({
        roomNumber: roomToEdit.name || '',
        price: roomToEdit.price || null,
        capacity: roomToEdit.capacity || null,
        discount: roomToEdit.discount || null,
        facilities: facilityIds,
        imgs: null,
      });
    }
  }, [roomToEdit, facilities]);

  const onSubmit = async (data: RoomFormData) => {
    const formData = new FormData();
    formData.append('roomNumber', data.roomNumber);
    if (data.price !== null) formData.append('price', data.price.toString());
    if (data.capacity !== null) formData.append('capacity', data.capacity.toString());
    if (data.discount !== null) formData.append('discount', data.discount.toString());

    if (data.facilities.length > 0) {
      data.facilities.forEach((id) => formData.append('facilities[]', id.toString()));
    }

    if (data.imgs && data.imgs.length > 0) {
      for (let i = 0; i < data.imgs.length; i++) {
        formData.append('imgs', data.imgs[i]);
      }
    }

    try {
      setLoading(true);

      if (roomToEdit) {
        await axiosInstance.put(ROOMS_URLS.UPDATE_ROOM(roomToEdit._id), formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Room updated successfully!');
      } else {
        await axiosInstance.post(ROOMS_URLS.ADD_ROOM, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Room added successfully!');
      }

      navigate('/dashboard/rooms');
      reset();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error occurred!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setValue('imgs', event.dataTransfer.files, { shouldValidate: true });
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {roomToEdit ? 'Edit Room' : 'Add New Room'}
      </Typography>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'transparent' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Room Number */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="roomNumber"
              control={control}
              rules={{ required: 'Room Number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Room Number"
                  variant="filled"
                  fullWidth
                  error={!!errors.roomNumber}
                  helperText={errors.roomNumber?.message}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                  }}
                />
              )}
            />
          </FormControl>

          {/* Grid Inputs */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
            {/* Price */}
            <Controller
              name="price"
              control={control}
              rules={{
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be positive' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  variant="filled"
                  InputLabelProps={{ shrink: true }} 
                  fullWidth
                  type="number"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  inputProps={{ step: '0.01' }}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
              )}
            />

            {/* Capacity */}
            <Controller
              name="capacity"
              control={control}
              rules={{
                required: 'Capacity is required',
                min: { value: 1, message: 'Must be at least 1' },
                validate: (v) =>
                  Number.isInteger(Number(v)) || 'Capacity must be an integer',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Capacity"
                  variant="filled"
                  InputLabelProps={{ shrink: true }} 
                  fullWidth
                  type="number"
                  error={!!errors.capacity}
                  helperText={errors.capacity?.message}
                  inputProps={{ min: '1' }}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
              )}
            />

            {/* Discount */}
            <Controller
              name="discount"
              control={control}
              rules={{
                required: 'Discount is required',
                min: { value: 0, message: 'Cannot be negative' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Discount"
                  variant="filled"
                  InputLabelProps={{ shrink: true }} 
                  fullWidth
                  type="number"
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                  inputProps={{ step: '0.01', min: '0' }}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
              )}
            />

            {/* Facilities */}
            <FormControl fullWidth error={!!errors.facilities}>
              <InputLabel id="facilities-label">Facilities</InputLabel>
              <Controller
                name="facilities"
                control={control}
                rules={{
                  validate: (value) =>
                    (Array.isArray(value) && value.length > 0) ||
                    'At least one facility is required',
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    labelId="facilities-label"
                    variant="filled"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((val) => {
                          const f = facilities.find((f) => f._id === val);
                          return <Chip key={val} label={f?.name || val} />;
                        })}
                      </Box>
                    )}
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  >
                    {facilities.map((f) => (
                      <MenuItem key={f._id} value={f._id}>
                        {f.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.facilities?.message}</FormHelperText>
            </FormControl>
          </Box>

          {/* Image Upload */}
          <Box
            sx={{
              mt: 4,
              p: 5,
              border: `2px dashed ${errors.imgs ? 'red' : '#4caf50'}`,
              borderRadius: 2,
              textAlign: 'center',
              backgroundColor: '#e8f5e9',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '150px',
            }}
            onClick={handleChooseImageClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              {...register('imgs')}
              ref={(e) => {
                fileInputRef.current = e;
                register('imgs').ref(e);
              }}
              style={{ display: 'none' }}
            />

            <CloudUploadIcon sx={{ fontSize: 50, color: errors.imgs ? 'red' : '#4caf50' }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Drag & Drop or{' '}
              <span style={{ color: errors.imgs ? 'red' : '#4caf50', fontWeight: 'bold' }}>
                Choose Room Images
              </span>
            </Typography>
            {watchedFiles?.length > 0 && (
              <Typography variant="caption" sx={{ mt: 1 }}>
                {watchedFiles.length} file(s) selected
              </Typography>
            )}
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => navigate('/dashboard/rooms')}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : roomToEdit ? 'Update' : 'Save'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default RoomData;
