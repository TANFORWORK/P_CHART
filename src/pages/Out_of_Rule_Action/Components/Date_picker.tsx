import { TextField } from "@mui/material";

interface DatepickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const Datepicker = ({ value, onChange, label }: DatepickerProps) => {
  return (
    <TextField
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      fullWidth
      label={label}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--color-base-200)",
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out",
          "& fieldset": {
            borderColor: "var(--color-base-300)",
            borderWidth: "1.5px",
          },
          "&:hover": {
            backgroundColor: "var(--color-base-100)",
            "& fieldset": {
              borderColor: "var(--color-primary)",
              borderWidth: "1.5px",
            },
          },
          "&.Mui-focused": {
            backgroundColor: "var(--color-base-100)",
            boxShadow: `0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent)`,
            "& fieldset": {
              borderColor: "var(--color-primary)",
              borderWidth: "2px",
            },
          },
          "& input": {
            color: "var(--color-base-content)",
            fontSize: "14px",
            "&::-webkit-calendar-picker-indicator": {
              filter: "var(--color-base-content) opacity(0.7)",
              cursor: "pointer",
              "&:hover": {
                opacity: 1,
              },
            },
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--color-base-content)",
          fontSize: "14px",
          fontWeight: 500,
          opacity: 0.8,
          "&.Mui-focused": {
            color: "var(--color-primary)",
            opacity: 1,
          },
          "&.MuiInputLabel-shrink": {
            backgroundColor: "var(--color-base-100)",
            padding: "0 8px",
            borderRadius: "4px",
            transform: "translate(14px, -9px) scale(0.75)",
          },
        },
        // Error state
        "&.Mui-error": {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--color-error)",
            },
            "&:hover fieldset": {
              borderColor: "var(--color-error)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-error)",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "var(--color-error)",
            },
          },
        },
      }}
    />
  );
};

export default Datepicker;
