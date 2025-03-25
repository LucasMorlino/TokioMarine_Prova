package br.com.tokiomarine.seguradora.service;

import br.com.tokiomarine.seguradora.model.Address;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CepService {

    private final WebClient webClient;

    public CepService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.brasilaberto.com/v1").build();
    }

    public Address buscarEnderecoPorCep(String cep) {
        String json = webClient.get()
                .uri("/zipcode/{cep}", cep)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode result = mapper.readTree(json).get("result");
            Address address = new Address();
            address.setPostalCode(result.get("zipcode").asText());
            address.setAddress(result.get("street").asText());
            address.setComplement(result.get("complement").asText(null));
            address.setCity(result.get("city").asText());
            address.setState(result.get("stateShortname").asText());
            address.setCountry("Brasil");
            return address;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao consultar CEP", e);
        }
    }

}
