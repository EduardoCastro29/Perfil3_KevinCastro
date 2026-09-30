import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#24664F',
    primarySoft: '#E7F1EB',
    background: '#F4F7F5',
    surface: '#FFFFFF',
    text: '#1C3028',
    muted: '#607067',
    border: '#D6E0D9',
    error: '#A53232',
    errorSoft: '#FFF1EF',
};

export const layout = StyleSheet.create({
    title: { fontSize: 30, fontWeight: '700', color: colors.text, letterSpacing: -0.7 },
    subtitle: { fontSize: 16, lineHeight: 24, color: colors.muted },
    eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 1.5, color: colors.primary },
    card: { backgroundColor: colors.surface, borderRadius: 24, padding: 24, gap: 20 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
});
