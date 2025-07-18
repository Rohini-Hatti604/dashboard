// Single select styles
export const getSingleSelectStyles = (isDark: boolean) => ({
    control: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? '#161616' : 'white',
        boxShadow: 'none',
        cursor: 'text',
        borderColor: isDark ? 'transparent' : '#d1d5db',
        '&:hover': {
            borderColor: 'transparent',
        },
    }),
    menu: (provided: any) => ({
        ...provided,
    }),
    menuList: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? 'var(--secondary-foreground)' : 'white',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? (isDark ? 'bg-secondary-foreground' : '#3b82f6')
            : state.isFocused
                ? (isDark ? 'bg-transparent' : '#f3f4f6')
                : 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
});

// Multi select styles
export const getMultiSelectStyles = (isDark: boolean) => ({
    control: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? '#161616' : 'white',
        boxShadow: 'none',
        cursor: 'text',
        borderColor: isDark ? 'transparent' : '#d1d5db',
        '&:hover': {
            borderColor: 'transparent',
        },
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? 'var(--secondary-foreground)' : 'white',
    }),
    menuList: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? 'var(--secondary-foreground)' : 'white',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? (isDark ? 'var(--secondary-foreground)' : '#3b82f6')
            : state.isFocused
                ? (isDark ? 'transparent' : '#f3f4f6')
                : 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? 'transparent' : '#dbeafe',
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: isDark ? 'white' : '#1e40af',
        borderRadius: '9999px',
        '&:hover': {
            backgroundColor: isDark ? 'transparent' : '#bfdbfe',
            color: isDark ? 'white' : '#1e40af',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
});
