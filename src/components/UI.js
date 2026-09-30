import React, { createContext, forwardRef, useContext, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

const FormScrollContext = createContext(() => {});

export const Button = ({ title, onPress, loading = false, disabled = false, variant = 'primary', style, ...props }) => {
    const inactive = disabled || loading;
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={title}
            accessibilityState={{ disabled: inactive, busy: loading }}
            disabled={inactive}
            onPress={onPress}
            style={({ pressed }) => [styles.button, styles[variant], inactive && styles.disabled, pressed && styles.pressed, style]}
            {...props}
        >
            {loading && <ActivityIndicator color={variant === 'primary' ? colors.surface : colors.primary} />}
            <Text style={[styles.buttonText, variant !== 'primary' && styles.secondaryText, variant === 'danger' && styles.dangerText]}>{title}</Text>
        </Pressable>
    );
};

export const Message = ({ children }) => children ? (
    <View style={styles.message} accessibilityLiveRegion="polite" accessibilityRole="alert">
        <Text style={styles.error}>{children}</Text>
    </View>
) : null;

export const Field = forwardRef(function Field({ label, error, hint, password = false, editable = true, ...props }, ref) {
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const revealFocusedInput = useContext(FormScrollContext);
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputFrame, focused && styles.focused, !!error && styles.invalid, !editable && styles.disabled]}>
                <TextInput
                    ref={ref}
                    accessibilityLabel={label}
                    accessibilityHint={error || hint}
                    placeholderTextColor={colors.muted}
                    selectionColor={colors.primary}
                    autoCorrect={false}
                    {...props}
                    style={styles.input}
                    editable={editable}
                    secureTextEntry={password && !visible}
                    onFocus={() => {
                        setFocused(true);
                        revealFocusedInput();
                    }}
                    onBlur={() => setFocused(false)}
                />
                {password && (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        onPress={() => setVisible(!visible)}
                        disabled={!editable}
                        style={styles.reveal}
                    >
                        <Text style={styles.revealText}>{visible ? 'Ocultar' : 'Mostrar'}</Text>
                    </Pressable>
                )}
            </View>
            {!!error && <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>}
            {!error && !!hint && <Text style={styles.hint}>{hint}</Text>}
        </View>
    );
});

export const FormScreen = ({ children, footer, centered = false }) => {
    const scrollRef = useRef(null);
    const revealFocusedInput = () => {
        requestAnimationFrame(() => {
            const input = TextInput.State.currentlyFocusedInput();
            if (input && Keyboard.isVisible()) {
                scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(input, footer ? 96 : 32, true);
            }
        });
    };

    return (
        <SafeAreaView style={styles.screen} edges={['top', 'left', 'right', 'bottom']}>
            <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={[styles.scroll, centered && styles.centered]}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
                    onKeyboardDidShow={revealFocusedInput}
                    onLayout={revealFocusedInput}
                >
                    <FormScrollContext.Provider value={revealFocusedInput}>
                        <View style={styles.content}>{children}</View>
                    </FormScrollContext.Provider>
                </ScrollView>
                {footer}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    fill: { flex: 1 },
    scroll: { flexGrow: 1, padding: 20, paddingVertical: 28 },
    centered: { justifyContent: 'center' },
    content: { width: '100%', maxWidth: 520, alignSelf: 'center', gap: 24 },
    button: { minHeight: 48, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8 },
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.primarySoft },
    ghost: { backgroundColor: 'transparent' },
    danger: { backgroundColor: colors.errorSoft },
    buttonText: { fontSize: 15, fontWeight: '600', color: colors.surface, textAlign: 'center', flexShrink: 1 },
    secondaryText: { color: colors.primary },
    dangerText: { color: colors.error },
    disabled: { opacity: 0.6 },
    pressed: { opacity: 0.8 },
    field: { gap: 8 },
    label: { fontSize: 14, fontWeight: '600', color: colors.text },
    inputFrame: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center' },
    focused: { borderColor: colors.primary },
    invalid: { borderColor: colors.error },
    input: { flex: 1, minWidth: 0, minHeight: 52, paddingHorizontal: 14, paddingVertical: 14, color: colors.text, fontSize: 16 },
    reveal: { minHeight: 48, paddingHorizontal: 12, justifyContent: 'center' },
    revealText: { fontSize: 13, fontWeight: '600', color: colors.primary },
    hint: { color: colors.muted, fontSize: 13, lineHeight: 19 },
    error: { color: colors.error, fontSize: 14, lineHeight: 21 },
    message: { padding: 14, borderRadius: 12, backgroundColor: colors.errorSoft },
});
