import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useAuthForm from '../hooks/useAuthForm';
import { Button, Field, FormScreen, Message } from './UI';
import { colors, layout } from '../theme';

const AuthForm = ({ accion, registro = false, onSwitch }) => {
    const { email, setEmail, password, setPassword, enviando, enviar, errores, error } = useAuthForm(accion);
    const passwordRef = useRef(null);

    return (
        <FormScreen centered>
            <View style={styles.brand}>
                <View style={styles.mark}><Text style={styles.markText}>f.</Text></View>
                <Text style={styles.brandName}>Evaluación Móvil</Text>
            </View>
            <View style={styles.heading}>
                <Text style={layout.eyebrow}> PLANILLA DE USUARIOS</Text>
                <Text style={layout.title}>{registro ? 'Crea tu cuenta' : 'Qué bueno verte'}</Text>
                <Text style={layout.subtitle}>{registro ? 'Un solo lugar para organizar tus usuarios.' : 'Inicia sesión para continuar con tus usuarios.'}</Text>
            </View>
            <View style={layout.card}>
                <Text style={layout.sectionTitle}>{registro ? 'Registro' : 'Iniciar sesión'}</Text>
                <Field
                    label="Correo electrónico"
                    placeholder="tu@correo.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    blurOnSubmit={false}
                    editable={!enviando}
                    error={errores.email}
                />
                <Field
                    ref={passwordRef}
                    label="Contraseña"
                    placeholder="Tu contraseña"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoComplete={registro ? 'new-password' : 'current-password'}
                    password
                    hint={registro ? 'Utiliza al menos 6 caracteres.' : undefined}
                    error={errores.password}
                    editable={!enviando}
                    returnKeyType="go"
                    onSubmitEditing={enviar}
                />
                <Message>{error}</Message>
                <Button title={enviando ? 'Un momento…' : registro ? 'Crear cuenta' : 'Iniciar sesión'} onPress={enviar} loading={enviando} />
            </View>
            <View style={styles.switch}>
                <Text style={styles.switchText}>{registro ? '¿Ya tienes una cuenta?' : '¿Es tu primera vez aquí?'}</Text>
                <Button title={registro ? 'Iniciar sesión' : 'Crear una cuenta'} variant="ghost" onPress={onSwitch} disabled={enviando} />
            </View>
        </FormScreen>
    );
};

const styles = StyleSheet.create({
    brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    mark: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    markText: { color: colors.surface, fontSize: 25, fontWeight: '700' },
    brandName: { fontSize: 17, fontWeight: '600', color: colors.text },
    heading: { gap: 10 },
    switch: { alignItems: 'center' },
    switchText: { color: colors.muted, fontSize: 14 },
});

export default AuthForm;
