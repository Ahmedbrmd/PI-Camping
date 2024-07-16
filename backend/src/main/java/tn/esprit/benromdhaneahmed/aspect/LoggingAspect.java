package tn.esprit.benromdhaneahmed.aspect;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j

public class LoggingAspect {
    @AfterReturning("execution(* tn.esprit.benromdhaneahmed.services.CampPlaceService.ajouter*(..))")
    public void logMethodEntry(JoinPoint joinPoint){
        String name = joinPoint.getSignature().getName();
        log.info("Bienvenue dans l'application Boycott :"+ name);

    }

}
