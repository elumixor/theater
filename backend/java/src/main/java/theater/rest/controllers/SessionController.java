package theater.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import theater.domain.entities.Session;
import theater.repositories.HallRepository;
import theater.repositories.PerformanceRepository;
import theater.repositories.SessionRepository;
import theater.rest.ControllerBase;

@RestController
@RequestMapping("/api/session")
public class SessionController extends ControllerBase<Session, SessionRepository> {

    private final
    HallRepository hallRepository;

    private final
    PerformanceRepository performanceRepository;

    @Autowired
    public SessionController(SessionRepository sessionRepository, HallRepository hallRepository, PerformanceRepository performanceRepository) {
        super(sessionRepository);
        this.hallRepository = hallRepository;
        this.performanceRepository = performanceRepository;
    }

    @Override
    public Session saveOrUpdate(@RequestBody Session entity) {
        System.out.println(entity);
        entity.hall = hallRepository.findById(entity.hall.getId()).orElseThrow();
        entity.performance = performanceRepository.findById(entity.performance.getId()).orElseThrow();
        entity.print();
        return super.saveOrUpdate(entity);
    }

    @Override
    public void update(@RequestBody Session entity, @PathVariable Long entityId) {
        var old = repository.findById(entityId).orElseThrow();

        old.date = entity.date;
        old.hall = hallRepository.findById(entity.hall.getId()).orElseThrow();
        old.performance = performanceRepository.findById(entity.performance.getId()).orElseThrow();
        repository.save(old);
    }
}
