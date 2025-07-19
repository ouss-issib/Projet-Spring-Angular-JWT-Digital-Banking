    package ma.enset.ebankingbackend.security;
    
    import com.nimbusds.jose.jwk.source.ImmutableSecret;
    import ma.enset.ebankingbackend.services.CustomUserDetailsService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.ProviderManager;
    import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
    import org.springframework.security.config.Customizer;
    import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
    import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.core.userdetails.User;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
    import org.springframework.security.oauth2.jwt.JwtDecoder;
    import org.springframework.security.oauth2.jwt.JwtEncoder;
    import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
    import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
    import org.springframework.security.provisioning.InMemoryUserDetailsManager;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
    
    import javax.crypto.spec.SecretKeySpec;
    import java.util.Arrays;
    import java.util.List;
    
    import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
    import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
    
    /**
     * @author $ {USER}
     **/
    
    @Configuration
    @EnableWebSecurity
    @EnableMethodSecurity(prePostEnabled = true)
    public class SecurityConfig {
    
        @Autowired
        private CustomUserDetailsService customUserDetailsService;
    
        @Value("${jwt.secret}")
        private String secret_key;
    
        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {
            return new BCryptPasswordEncoder();
        }
    
    //    @Bean
    //    public InMemoryUserDetailsManager inMemoryUserDetailsManager() {
    //        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    //        return new InMemoryUserDetailsManager(
    //                User.withUsername("admin").password(passwordEncoder.encode("123321")).authorities("USER","ADMIN").build(),
    //                User.withUsername("oussbi").password(passwordEncoder.encode("123321")).authorities("USER").build()
    //        );
    //    }
    
        @Bean
        public JwtAuthenticationConverter jwtAuthenticationConverter() {
            JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
            grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");  // ensures role prefix
    
            JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
            jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
            return jwtAuthenticationConverter;
        }
    
        @Bean
        AuthenticationManager authenticationManager() {
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setPasswordEncoder(bCryptPasswordEncoder());
            provider.setUserDetailsService(customUserDetailsService);
            return new ProviderManager(provider);
        }
    
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
            return httpSecurity
                    .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .csrf(csrf -> csrf.disable())
                    .cors(Customizer.withDefaults())
                    .authorizeHttpRequests(ar -> ar
                            .requestMatchers("/auth/login/**", "/auth/register/**").permitAll()
                            .requestMatchers("/api/dashboard/**").hasRole("ADMIN")
                            .anyRequest().authenticated()
                    )
                    .oauth2ResourceServer(oa -> oa
                            .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                    )
                    .build();
        }
    
        @Bean
        JwtEncoder  jwtEncoder() {
            //String secret_key = "aezrtyuioppoiuytreazazerteyuiopetyrizpaiuzoiaoisfdrgdsgsfsfdgsgb";
            return new NimbusJwtEncoder(new ImmutableSecret<>(secret_key.getBytes()));
        }
    
        @Bean
        JwtDecoder jwtDecoder() {
           // String secret_key = "aezrtyuioppoiuytreazazerteyuiopetyrizpaiuzoiaoisfdrgdsgsfsfdgsgb";
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret_key.getBytes(), "RSA");
            return NimbusJwtDecoder.withSecretKey(secretKeySpec).macAlgorithm(MacAlgorithm.HS512).build();
        }
    
    //    @Bean
    //    AuthenticationManager authenticationManager(UserDetailsService userDetailsService) {
    //        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
    //        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());
    //        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
    //        return new ProviderManager(daoAuthenticationProvider);
    //    }
    
        @Bean
        CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOrigin("*");
            corsConfiguration.addAllowedMethod("*");
            corsConfiguration.addAllowedHeader("*");
            //corsConfiguration.setExposedHeaders(List.of("x-auth-token"));
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", corsConfiguration);
            return source;
        }
    }
