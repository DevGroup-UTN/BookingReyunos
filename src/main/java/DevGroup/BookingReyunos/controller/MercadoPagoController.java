package DevGroup.BookingReyunos.controller;

import DevGroup.BookingReyunos.model.UserBuyer;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.net.HttpStatus;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MercadoPagoController {

    @Value("${codigo.mercadoLibre}")
    private String mercadoLibreToken;

    @PostMapping("/mp")
    public ResponseEntity<String> createPreference(@RequestBody UserBuyer userBuyer) {
        if (userBuyer == null) {
            return ResponseEntity.badRequest().body("Error en los datos enviados.");
        }

        try {
            // Configuramos el token de acceso
            MercadoPagoConfig.setAccessToken(mercadoLibreToken);

            // Creamos el item de preferencia de Mercado Pago
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(userBuyer.getTitle())
                    .quantity(userBuyer.getQuantity())
                    .unitPrice(userBuyer.getUnit_price())
                    .currencyId("ARS")
                    .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            // URLs de redirección de Mercado Pago
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("https://chatgpt.com/success")
                    .pending("https://chatgpt.com/pending")
                    .failure("https://chatgpt.com/failure")
                    .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            return ResponseEntity.ok(preference.getId());
        } catch (MPException | MPApiException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la preferencia de pago: " + e.getMessage());
        }
    }
}
